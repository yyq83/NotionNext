import AISummary from '@/components/AISummary'
import ArticleExpirationNotice from '@/components/ArticleExpirationNotice'
import Comment from '@/components/Comment'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import { getPageTableOfContents } from '@/lib/db/notion/getPageTableOfContents'
import { useGlobal } from '@/lib/global'
import { IconArrowLeft, IconArrowUp } from '@tabler/icons-react'
import { uuidToId } from 'notion-utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PostDate, Taxonomy } from './Posts'

const PostLock = ({ validPassword }) => {
  const { locale } = useGlobal()
  const [hasError, setHasError] = useState(false)
  const submit = event => {
    event.preventDefault()
    setHasError(
      !validPassword(new FormData(event.currentTarget).get('password'))
    )
  }

  return (
    <form className='paper-lock' onSubmit={submit}>
      <label htmlFor='paper-password'>{locale.COMMON.ARTICLE_LOCK_TIPS}</label>
      <div className='paper-form'>
        <input id='paper-password' name='password' type='password' required />
        <button type='submit'>{locale.COMMON.SUBMIT}</button>
      </div>
      {hasError && <p role='alert'>{locale.COMMON.PASSWORD_ERROR}</p>}
    </form>
  )
}

const TocList = ({ toc }) => (
  <ul className='paper-toc-list'>
    {toc.map(({ id, indentLevel, text }) => (
      <li key={id} style={{ marginInlineStart: `${indentLevel}rem` }}>
        <a href={`#${uuidToId(id)}`}>{text}</a>
      </li>
    ))}
  </ul>
)

const ArticleToc = ({ toc, label }) => (
  <>
    <details className='paper-toc'>
      <summary>{label}</summary>
      <TocList toc={toc} />
    </details>
    <aside className='paper-toc-side'>
      <nav aria-label={label}>
        <p className='paper-toc-title'>{label}</p>
        <TocList toc={toc} />
      </nav>
    </aside>
  </>
)

export const Article = ({ post, lock, validPassword, prev, next }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  if (!post)
    return (
      <p>
        {router.isFallback
          ? locale.COMMON.LOADING_ARTICLE
          : locale.COMMON.NOT_FOUND}
      </p>
    )
  const isPost = post.type === 'Post'
  const rootContent = post.blockMap?.block?.[post.id]?.value?.content
  const toc =
    !lock && rootContent
      ? getPageTableOfContents({ ...post, content: rootContent }, post.blockMap)
      : []
  const tags = post.tagItems?.length
    ? post.tagItems
    : post.tags?.map(name => ({ name }))

  return (
    <article id='article-wrapper' className='paper-article'>
      {isPost && (
        <SmartLink href='/archive' className='paper-inline paper-back'>
          <IconArrowLeft size={17} aria-hidden /> {locale.NAV.ARCHIVE}
        </SmartLink>
      )}
      <h1 className='paper-title'>{post.title}</h1>
      {isPost && <PostDate post={post} />}
      {lock ? (
        <PostLock key={post.id} validPassword={validPassword} />
      ) : (
        <div className='paper-article-body'>
          {toc.length > 0 && (
            <ArticleToc toc={toc} label={locale.COMMON.TABLE_OF_CONTENTS} />
          )}
          <ArticleExpirationNotice post={post} />
          <AISummary aiSummary={post.aiSummary} />
          {post.blockMap && <NotionPage post={post} />}
          {isPost && (
            <div className='paper-article-end'>
              <Taxonomy items={tags} route='tag' />
              <div className='paper-to-top'>
                <a href='#theme-astropaper' className='paper-inline'>
                  <IconArrowUp size={17} aria-hidden /> {locale.POST.TOP}
                </a>
              </div>
              {(prev || next) && (
                <nav className='paper-adjacent'>
                  {[prev, next].map((item, index) => (
                    <div key={index}>
                      {item && (
                        <SmartLink href={item.href || `/${item.slug}`}>
                          <span className='paper-muted'>
                            {index === 0
                              ? locale.COMMON.PREV_POST
                              : locale.COMMON.NEXT_POST}
                          </span>
                          <span className='paper-accent'>{item.title}</span>
                        </SmartLink>
                      )}
                    </div>
                  ))}
                </nav>
              )}
              <ShareBar post={post} />
            </div>
          )}
          <Comment frontMatter={post} />
        </div>
      )}
    </article>
  )
}
