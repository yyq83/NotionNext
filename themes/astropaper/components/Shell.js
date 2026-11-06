import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { resolveContactEmail } from '@/lib/plugins/mailEncrypt'
import {
  IconBrandBilibili,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconMoon,
  IconSearch,
  IconSun
} from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const socialLinks = [
  ['CONTACT_GITHUB', 'GitHub', IconBrandGithub],
  ['CONTACT_TWITTER', 'X', IconBrandX],
  ['CONTACT_BILIBILI', '哔哩哔哩', IconBrandBilibili],
  ['CONTACT_LINKEDIN', 'LinkedIn', IconBrandLinkedin]
]

export const SiteIcon = ({ size }) => {
  const src = siteConfig('BLOG_FAVICON') || siteConfig('AVATAR')
  if (!src) return null

  return (
    <Image
      src={src}
      alt=''
      width={size}
      height={size}
      loading='eager'
      unoptimized
      className='paper-site-icon'
    />
  )
}

export const Socials = () => {
  const { locale } = useGlobal()
  const email = siteConfig('CONTACT_EMAIL')

  return (
    <div className='paper-icons'>
      {socialLinks.map(([key, name, Icon]) => {
        const url = siteConfig(key)
        return (
          url && (
            <SmartLink
              key={key}
              className='paper-icon'
              href={url}
              aria-label={name}
              title={name}
            >
              <Icon size={20} aria-hidden />
            </SmartLink>
          )
        )
      })}
      {email && (
        <button
          type='button'
          className='paper-icon'
          aria-label={locale.NAV.MAIL}
          title={locale.NAV.MAIL}
          onClick={() => {
            window.location.href = `mailto:${resolveContactEmail(email)}`
          }}
        >
          <IconMail size={20} aria-hidden />
        </button>
      )}
    </div>
  )
}

export const Header = ({ title }) => {
  const router = useRouter()
  const { locale, isDarkMode, toggleDarkMode } = useGlobal()
  const nav = [
    { href: '/archive', label: locale.NAV.ARCHIVE },
    { href: '/tag', label: locale.COMMON.TAGS },
    { href: '/about', label: locale.NAV.ABOUT }
  ]
  const active = href =>
    router.pathname === href ||
    router.asPath.split(/[?#]/)[0] === href ||
    router.pathname.startsWith(href + '/')
  const appearance = isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE

  return (
    <header className='paper-header'>
      <SmartLink href='/' className='paper-brand'>
        <SiteIcon size={24} />
        <span>{title}</span>
      </SmartLink>
      <nav className='paper-nav'>
        {nav.map(({ href, label }) => (
          <SmartLink
            key={href}
            href={href}
            aria-current={active(href) ? 'page' : undefined}
          >
            {label}
          </SmartLink>
        ))}
        <SmartLink
          href='/search'
          className='paper-icon'
          aria-current={active('/search') ? 'page' : undefined}
          aria-label={locale.NAV.SEARCH}
          title={locale.NAV.SEARCH}
        >
          <IconSearch size={21} aria-hidden />
        </SmartLink>
        <button
          type='button'
          className='paper-icon'
          onClick={toggleDarkMode}
          aria-label={appearance}
          title={appearance}
        >
          {isDarkMode ? (
            <IconSun size={21} aria-hidden />
          ) : (
            <IconMoon size={21} aria-hidden />
          )}
        </button>
      </nav>
    </header>
  )
}

export const Footer = ({ title, customMenu = [] }) => {
  const { locale } = useGlobal()
  const since = siteConfig('SINCE')
  const filing = siteConfig('BEI_AN')
  const year = new Date().getFullYear()
  const primary = new Set([
    '/',
    '/#',
    '#',
    '/archive',
    '/tag',
    '/about',
    '/category'
  ])
  const links = customMenu
    .flatMap(menu => [menu, ...(menu.subMenus || [])])
    .filter(({ show, href }) => show !== false && href && !primary.has(href))

  return (
    <footer className='paper-footer'>
      <div className='paper-footer-links'>
        <SmartLink href='/category'>{locale.COMMON.CATEGORY}</SmartLink>
        {links.map(({ href, name, target }) => (
          <SmartLink key={href} href={href} target={target}>
            {name}
          </SmartLink>
        ))}
      </div>
      <div className='paper-footer-bottom'>
        <p>
          © {since && String(since) !== String(year) ? `${since}–` : ''}
          {year} {title}
          {filing && (
            <>
              {' '}
              · <SmartLink href={siteConfig('BEI_AN_LINK')}>{filing}</SmartLink>
            </>
          )}
        </p>
        <Socials />
      </div>
    </footer>
  )
}
