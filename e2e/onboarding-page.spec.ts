import { test, expect } from '@playwright/test'

test.describe('Onboarding page', () => {
  test('should redirect anon users to the onboarding page', async ({
    page,
  }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/')
    // Find an element with the text 'About' and click on it

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('/onboarding')

    // we have 2 h1 one for screen reader and one for the user
    const h1s = await page.locator('h1').all()
    expect(h1s).toHaveLength(2)

    await expect(h1s[1]).toContainText('Welcome on walkies !')
  })

  test('should display a link to the /login page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/')
    // Find an element with the text 'About' and click on it

    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('/onboarding')

    // button with To login page label

    const loginButton = await page.locator('button:has-text("To login page")')
    await expect(loginButton).toBeVisible()

    await loginButton.click()
    await expect(page).toHaveURL('/login')
  })
})