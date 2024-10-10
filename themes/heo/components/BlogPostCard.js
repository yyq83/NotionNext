import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article className={` ${COVER_HOVER_ENLARGE ? 'hover:transition-all duration-150' : ''}`}>
      <div className='flex flex-col h-full'>
        {/* 图片封面 */}
        {showPageCover && (
          <Link href={post?.href} passHref legacyBehavior>
            <div className='flex-shrink-0 overflow-hidden cursor-pointer select-none'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-48 w-full object-cover group-hover:scale-105 group-hover:brightness-75 transition-all duration-500 ease-in-out'
              />
            </div>
          </Link>
        )}

        {/* 文字区块 */}
        <div className='flex flex-col justify-between flex-grow p-4 bg-white dark:bg-[#1e1e1e]'>
          <header>
            {/* 标题和图标 */}
            <Link
              href={post?.href}
              passHref
              className='group-hover:text-indigo-700 dark:hover:text-yellow-700 dark:group-hover:text-yellow-600 text-black dark:text-gray-100 line-clamp-2 replace cursor-pointer text-xl font-extrabold leading-tight'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-6 h-6 mr-1 align-middle transform translate-y-[-8%]"
                />
              )}
              <span className='menu-link'>{post.title}</span>
            </Link>
          </header>

          {/* 摘要 */}
          {(!showPreview || showSummary) && (
            <main className='line-clamp-2 replace text-gray-700 dark:text-gray-300 text-sm font-light leading-tight'>
              {post.summary}
            </main>
          )}

          <div className='flex flex-wrap md:justify-start'>
            <div>
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
