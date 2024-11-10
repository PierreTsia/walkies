import { authenticatedTest, expect } from './fixtures'
import { BrowserContext } from '@playwright/test'

authenticatedTest.describe('Authenticated Tests', () => {
  authenticatedTest(
    'should access protected content as admin',
    async ({
      authenticatedAdminContext,
    }: {
      authenticatedAdminContext: BrowserContext
    }) => {
      const page = await authenticatedAdminContext.newPage()
      await page.goto('/')
      await expect(page).toHaveURL('/')
      await expect(
        page.locator(`text=Hey, ${process.env.TEST_ADMIN_USER_EMAIL}!`),
      ).toBeVisible()
    },
  )

  authenticatedTest.skip(
    'should access protected content as regular user',
    async ({
      authenticatedUserContext,
    }: {
      authenticatedUserContext: BrowserContext
    }) => {
      const page = await authenticatedUserContext.newPage()
      await page.goto('/')
      await expect(page).toHaveURL('/')
      await expect(
        page.locator(`text=Hey, ${process.env.TEST_USER_EMAIL}!`),
      ).toBeVisible()
    },
  )
})
