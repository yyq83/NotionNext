import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconSearch
} from '@tabler/icons-react'
import { useRouter } from 'next/router'

export const PostDate = ({ post }) => {
  const { lang } = useGlobal()
  const date = new Date(post.date?.start_date || post.publishDate)
  if (Number.isNaN(date.getTime())) return null

  return (
    <div className='paper-date'>
      <IconCalendar size={16} aria-hidden />
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString(lang, {
          dateStyle: 'medium',
          timeZone: 'UTC'
        })}
      </time>
    </div>
  )
}

export const PostList = ({ posts = [], heading: Heading = 'h2' }) => (
  <ul className='paper-post-list'>
    {posts.map(post => (
      <li key={post.id || post.slug} className='paper-post'>
        <Heading>
          <SmartLink
            className='paper-accent'
            href={post.href || `/${post.slug}`}
          >
            {post.title}
          </SmartLink>
        </Heading>
        <PostDate post={post} />
        {post.summary && <p>{post.summary}</p>}
      </li>
    ))}
  </ul>
)

export const Pagination = ({ page = 1, postCount }) => {
  const { locale, NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const listStyle = siteConfig('POST_LIST_STYLE', 'page', NOTION_CONFIG)
  const currentPage = Number(page)
  const totalPages = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)
  )
  if (listStyle === 'scroll' || totalPages <= 1 || !totalPages) return null

  const base = router.asPath
    .split(/[?#]/)[0]
    .replace(/\.html$/, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const pathFor = number =>
    number === 1 ? base || '/' : `${base}/page/${number}`

  return (
    <nav className='paper-pagination'>
      <span>
        {currentPage > 1 && (
          <SmartLink href={pathFor(currentPage - 1)} className='paper-inline'>
            <IconArrowLeft size={17} aria-hidden /> {locale.PAGINATION.PREV}
          </SmartLink>
        )}
      </span>
      <span className='paper-muted'>
        {currentPage} / {totalPages}
      </span>
      <span>
        {currentPage < totalPages && (
          <SmartLink href={pathFor(currentPage + 1)} className='paper-inline'>
            {locale.PAGINATION.NEXT} <IconArrowRight size={17} aria-hidden />
          </SmartLink>
        )}
      </span>
    </nav>
  )
}

export const SearchForm = ({ keyword }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const label = locale.SEARCH.ARTICLES

  const submit = event => {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get('q').trim()
    const { theme } = router.query
    router.push({
      pathname: value ? `/search/${encodeURIComponent(value)}` : '/search',
      query: theme ? { theme } : undefined
    })
  }

  return (
    <form onSubmit={submit} role='search' className='paper-form'>
      <input
        name='q'
        type='search'
        defaultValue={keyword}
        placeholder={label}
        aria-label={label}
      />
      <button
        type='submit'
        className='paper-icon'
        aria-label={locale.NAV.SEARCH}
      >
        <IconSearch size={20} aria-hidden />
      </button>
    </form>
  )
}

export const Taxonomy = ({ items = [], route }) => (
  <ul className='paper-taxonomy'>
    {items.map(({ name, count }) => (
      <li key={name}>
        <SmartLink
          href={`/${route}/${encodeURIComponent(name)}`}
          className='paper-accent'
        >
          {route === 'tag' ? '#' : ''}
          {name}
        </SmartLink>
        {count > 0 && <span className='paper-muted'> ({count})</span>}
      </li>
    ))}
  </ul>
)
