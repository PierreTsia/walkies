import { expect, test } from '@playwright/test'

test.describe('Login page', () => {
  test('should let the admin user login', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveURL('/login')
    const emailInput = page.locator('input#email')
    const USER_EMAIL = process.env.TEST_ADMIN_USER_EMAIL ?? ''
    await emailInput.fill(USER_EMAIL)

    const passwordInput = page.locator('input#password')

    const WRONG_PASSWORD = 'wrong-password'
    const CORRECT_PASSWORD = process.env.TEST_ADMIN_USER_PASSWORD ?? ''
    await passwordInput.fill(WRONG_PASSWORD)

    const submitButton = page.locator('button[type="submit"]')

    await submitButton.click()

    await expect(page).toHaveURL('/login?message=Could not authenticate user')

    await passwordInput.fill(CORRECT_PASSWORD)
    await submitButton.click()
    await expect(page).toHaveURL('/')
  })
})
