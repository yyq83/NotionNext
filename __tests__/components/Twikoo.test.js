import { act, render } from '@testing-library/react'
import Twikoo from '@/components/Twikoo'
import { loadExternalResource } from '@/lib/utils'

jest.mock('@/lib/config', () => ({
  siteConfig: key => ({
    COMMENT_TWIKOO_ENV_ID: 'https://earthyang.com/comments-api',
    COMMENT_TWIKOO_CDN_URL: '/vendor/twikoo/2.0.15/twikoo.min.js',
    COMMENT_TWIKOO_ELEMENT_ID: '#twikoo',
    LANG: 'zh-CN'
  })[key]
}))
jest.mock('@/lib/utils', () => ({ loadExternalResource: jest.fn() }))

beforeEach(() => {
  jest.useFakeTimers()
  loadExternalResource.mockResolvedValue(undefined)
})
afterEach(() => {
  jest.useRealTimers()
  delete window.twikoo
})

it('does not initialize again while the asynchronous initializer is pending', async () => {
  let resolveInit
  window.twikoo = { init: jest.fn(() => new Promise(resolve => { resolveInit = resolve })) }
  const view = render(<Twikoo />)
  await act(async () => { jest.advanceTimersByTime(1000) })
  await act(async () => { jest.advanceTimersByTime(5000) })
  expect(window.twikoo.init).toHaveBeenCalledTimes(1)
  await act(async () => { resolveInit() })
  await act(async () => { jest.advanceTimersByTime(3000) })
  expect(loadExternalResource).toHaveBeenCalledTimes(1)
  view.unmount()
})

it('retries when asynchronous initialization fails', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  window.twikoo = { init: jest.fn().mockRejectedValueOnce(new Error('network')).mockResolvedValue(undefined) }
  const view = render(<Twikoo />)
  await act(async () => { jest.advanceTimersByTime(1000) })
  await act(async () => { jest.advanceTimersByTime(1000) })
  expect(window.twikoo.init).toHaveBeenCalledTimes(2)
  expect(window.twikoo.init).toHaveBeenLastCalledWith(expect.objectContaining({
    envId: 'https://earthyang.com/comments-api'
  }))
  view.unmount()
})
