// tests/fixtures.ts
import { test as base, BrowserContext } from '@playwright/test'
import { uiLogin } from './utils/auth-helpers'

export const authenticatedTest = base.extend<{
  authenticatedAdminContext: BrowserContext
  authenticatedUserContext: BrowserContext
}>({
  authenticatedAdminContext: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await uiLogin(
      page,
      process.env.TEST_ADMIN_USER_EMAIL ?? '',
      process.env.TEST_ADMIN_USER_PASSWORD ?? '',
    )

    await use(context)
    await context.close()
  },

  authenticatedUserContext: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await uiLogin(
      page,
      process.env.TEST_USER_EMAIL ?? '',
      process.env.TEST_USER_PASSWORD ?? '',
    )

    await use(context)
    await context.close()
  },
})

export { expect } from '@playwright/test'
