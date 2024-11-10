import { authenticatedTest, expect } from './fixtures'
import { BrowserContext } from '@playwright/test'

authenticatedTest.describe('Authenticated Tests Admin', () => {
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
      const logoutButton = page.locator('button#logout-button')
      await expect(logoutButton).toBeVisible()
      await logoutButton.click()

      await expect(page).toHaveURL('/login')
    },
  )
})
