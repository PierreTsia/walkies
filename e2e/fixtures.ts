import { test as base, BrowserContext } from '@playwright/test'
import { authenticateUser } from './utils/auth-helpers'

export const authenticatedTest = base.extend<{
  authenticatedAdminContext: BrowserContext
  authenticatedUserContext: BrowserContext
}>({
  authenticatedAdminContext: async ({ browser }, use) => {
    const context = await browser.newContext()
    await authenticateUser(
      context,
      context.request,
      'pierre.tsiakkaros@gmail.com',
      'V3nd3tt475013!',
    )
    await use(context)
    await context.close()
  },

  authenticatedUserContext: async ({ browser }, use) => {
    const context = await browser.newContext()
    await authenticateUser(
      context,
      context.request,
      process.env.TEST_USER_EMAIL as string,
      process.env.TEST_USER_PASSWORD as string,
    )

    await use(context)
    await context.close()
  },
})

export { expect } from '@playwright/test'
