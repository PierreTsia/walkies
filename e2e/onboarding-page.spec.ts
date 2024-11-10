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

  test('should display an onboarding form', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveURL('/onboarding')
    const nameInput = await page.locator('input#name')
    await expect(nameInput).toBeVisible()
    const emailInput = await page.locator('input#email')
    await expect(emailInput).toBeVisible()
    const contentText = await page.locator('textarea#content_text')
    await expect(contentText).toBeVisible()
    const submitButton = await page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
  })

  test('should not be able to submit without required fields', async ({
    page,
  }) => {
    await page.goto('/')

    await expect(page).toHaveURL('/onboarding')

    const submitButton = await page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    await expect(
      page.locator('p:has-text("Your request is currently on status ")'),
    ).not.toBeVisible()

    await submitButton.click()
    await expect(page).toHaveURL('/onboarding')

    const emailInput = await page.locator('input#email')
    await emailInput.fill('invalid-email')

    const nameInput = await page.locator('input#name')
    await nameInput.fill('t')

    await submitButton.click()

    await expect(
      page.locator('p:has-text("Your request is currently on status ")'),
    ).not.toBeVisible()
  })

  test('should let the user send a request', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveURL('/onboarding')
    const nameInput = await page.locator('input#name')
    await nameInput.fill('test USER-CI')

    const emailInput = await page.locator('input#email')
    await emailInput.fill('test-user-ci+pending@mail.com')

    const contentText = await page.locator('textarea#content_text')

    await contentText.fill('I am a test user for CI with a pending status')

    const submitButton = await page.locator('button[type="submit"]')

    await submitButton.click()

    await expect(
      page.locator('p:has-text("Your request is currently on status ")'),
    ).toBeVisible()
  })
})
