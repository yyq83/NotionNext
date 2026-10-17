import { render, screen } from '@testing-library/react'
import MyApp from '@/pages/_app'

jest.mock('@/hooks/useAdjustStyle', () => () => {})
jest.mock('@/blog.config', () => ({ THEME: 'heo' }))
jest.mock('@/lib/utils', () => ({ getQueryParam: () => null }))
jest.mock('@/lib/global', () => ({
  GlobalContextProvider: ({ children }) => children
}))
jest.mock('@/themes/theme', () => ({
  // An unresolved dynamic layout renders its fallback without its children.
  getBaseLayoutByTheme: () => () => null
}))
jest.mock('@/lib/utils/errorHandler', () => ({
  createErrorBoundary: () => ({ children }) => children
}))
jest.mock('@/components/ExternalPlugins', () => () => null)
jest.mock('@/components/PWAInstaller', () => () => null)
jest.mock('@/components/SEO', () => props => (
  <span data-testid='seo'>{props.siteInfo.title}</span>
))

it('renders SEO with page data even while the theme layout is unresolved', () => {
  render(
    <MyApp
      Component={() => <article>Article content</article>}
      pageProps={{ siteInfo: { title: 'Earthyang Blog' } }}
    />
  )

  expect(screen.getByTestId('seo')).toHaveTextContent('Earthyang Blog')
  expect(screen.queryByText('Article content')).not.toBeInTheDocument()
})
