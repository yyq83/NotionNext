import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { IconChevronLeft } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

function getPreviousPage() {
  const navigation = window.navigation
  const current = navigation?.currentEntry
  if (!current?.url) return null

  const currentPage = current.url.split('#')[0]
  const entries = navigation.entries()
  // In-page links such as the article TOC can add their own history entries.
  for (let index = current.index - 1; index >= 0; index--) {
    const entry = entries[index]
    if (entry?.url && entry.url.split('#')[0] !== currentPage) return entry
  }
  return null
}

export const PageBack = ({ href, label }) => {
  const { locale } = useGlobal()
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    const update = () => setPrevious(getPreviousPage())
    update()
    window.navigation?.addEventListener('currententrychange', update)
    return () =>
      window.navigation?.removeEventListener('currententrychange', update)
  }, [])

  const goBack = event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const entry = getPreviousPage()
    if (!entry) return

    event.preventDefault()
    window.history.go(entry.index - window.navigation.currentEntry.index)
  }

  return previous ? (
    <a className='paper-inline paper-back' href={previous.url} onClick={goBack}>
      <IconChevronLeft size={17} aria-hidden />
      {locale.POST.BACK}
    </a>
  ) : (
    <SmartLink
      href={href}
      replace
      className='paper-inline paper-back'
      onClick={goBack}
    >
      <IconChevronLeft size={17} aria-hidden />
      {label}
    </SmartLink>
  )
}
