// AstroPaper visual design adapted from satnaing/astro-paper (MIT).
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { IconArrowRight, IconRss } from '@tabler/icons-react'
import { Article } from './components/Article'
import { Pagination, PostList, SearchForm, Taxonomy } from './components/Posts'
import { Footer, Header, SiteIcon, Socials } from './components/Shell'
import CONFIG from './config'
import { Style } from './style'

const LayoutBase = ({ children, siteInfo, customMenu }) => {
  const { isLiteMode } = useGlobal()
  const title = siteConfig('TITLE', siteInfo?.title || 'NotionNext')

  return (
    <div id='theme-astropaper'>
      <Style />
      <div className='paper-shell'>
        {!isLiteMode && <Header title={title} />}
        <main id='paper-main' className='paper-main'>
          {children}
        </main>
        {!isLiteMode && <Footer title={title} customMenu={customMenu} />}
      </div>
    </div>
  )
}

const LayoutIndex = ({ posts = [], siteInfo }) => {
  const { locale } = useGlobal()
  const title = siteConfig('TITLE', siteInfo?.title)
  const description = siteConfig('DESCRIPTION', siteInfo?.description)
  const featuredTag =
    siteConfig('TOP_TAG') || siteConfig('ASTROPAPER_FEATURED_TAG', null, CONFIG)
  const featured = featuredTag
    ? posts.filter(post => post.tags?.includes(featuredTag))
    : []
  const recentCount = siteConfig('ASTROPAPER_RECENT_COUNT', null, CONFIG)
  const recent = posts
    .filter(post => !featured.includes(post))
    .sort((a, b) => b.publishDate - a.publishDate)
    .slice(0, recentCount)

  return (
    <>
      <section className='paper-hero'>
        <div className='paper-hero-title'>
          <h1>
            <SiteIcon size={40} />
            <span>{title}</span>
          </h1>
          {siteConfig('ENABLE_RSS') && (
            <a
              href='/rss/feed.xml'
              className='paper-icon paper-accent'
              aria-label={locale.NAV.RSS}
              title={locale.NAV.RSS}
            >
              <IconRss size={23} aria-hidden />
            </a>
          )}
        </div>
        {description && <p>{description}</p>}
        <Socials />
      </section>
      {featured.length > 0 && (
        <section className='paper-section'>
          <h2>{locale.COMMON.RECOMMEND_POSTS}</h2>
          <PostList posts={featured} heading='h3' />
        </section>
      )}
      {recent.length > 0 && (
        <section className='paper-section'>
          <h2>{locale.COMMON.LATEST_POSTS}</h2>
          <PostList posts={recent} heading='h3' />
        </section>
      )}
      <div className='paper-all-posts'>
        <SmartLink href='/archive' className='paper-inline'>
          {locale.COMMON.ARTICLE_LIST} <IconArrowRight size={18} aria-hidden />
        </SmartLink>
      </div>
    </>
  )
}

const LayoutArchive = ({ archivePosts = {} }) => {
  const { locale } = useGlobal()
  const years = new Map()
  for (const [month, posts] of Object.entries(archivePosts)) {
    const year = month.slice(0, 4)
    if (!years.has(year)) years.set(year, [])
    years.get(year).push(...posts)
  }

  return (
    <div className='paper-page'>
      <h1 className='paper-title'>{locale.NAV.ARCHIVE}</h1>
      <SmartLink className='paper-accent' href='/category'>
        {locale.COMMON.CATEGORY}
      </SmartLink>
      {[...years].map(([year, posts]) => (
        <section key={year} className='paper-section'>
          <h2>{year}</h2>
          <PostList posts={posts} heading='h3' />
        </section>
      ))}
    </div>
  )
}

const LayoutPostList = ({ tag, category, posts, ...pagination }) => {
  const { locale } = useGlobal()
  return (
    <div className='paper-page'>
      <h1 className='paper-title'>
        {tag ? `#${tag}` : category || locale.COMMON.ARTICLE_LIST}
      </h1>
      <PostList posts={posts} />
      <Pagination {...pagination} />
    </div>
  )
}

const LayoutSearch = ({
  keyword = '',
  posts,
  browserSearch,
  ...pagination
}) => {
  const { locale } = useGlobal()
  return (
    <div className='paper-page'>
      <h1 className='paper-title'>{locale.NAV.SEARCH}</h1>
      <SearchForm key={keyword} keyword={keyword} />
      {keyword && (
        <>
          <p className='paper-search-status' role='status'>
            {pagination.postCount > 0
              ? `${pagination.postCount} ${locale.COMMON.RESULT_OF_SEARCH}`
              : locale.COMMON.NO_RESULTS_FOUND}
          </p>
          <PostList posts={posts} />
          {!browserSearch && <Pagination {...pagination} />}
        </>
      )}
    </div>
  )
}

const LayoutTagIndex = ({ tagOptions }) => {
  const { locale } = useGlobal()
  return (
    <div className='paper-page'>
      <h1 className='paper-title'>{locale.COMMON.TAGS}</h1>
      <Taxonomy items={tagOptions} route='tag' />
    </div>
  )
}

const LayoutCategoryIndex = ({ categoryOptions }) => {
  const { locale } = useGlobal()
  return (
    <div className='paper-page'>
      <h1 className='paper-title'>{locale.COMMON.CATEGORY}</h1>
      <Taxonomy items={categoryOptions} route='category' />
    </div>
  )
}

const Layout404 = () => {
  const { locale } = useGlobal()
  return (
    <div className='paper-page paper-empty'>
      <h1 className='paper-title'>404</h1>
      <p>{locale.NAV.PAGE_NOT_FOUND}</p>
      <SmartLink href='/' className='paper-accent'>
        {locale.NAV.INDEX}
      </SmartLink>
    </div>
  )
}

const layouts = {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug: Article,
  LayoutTagIndex
}

export const AstroPaperLayout = ({ layoutName = 'LayoutBase', ...props }) => {
  const Layout = layouts[layoutName] || Article
  return <Layout {...props} />
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  Article as LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
