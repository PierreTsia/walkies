// utils/authHelpers.ts
import { Page } from '@playwright/test'

export async function uiLogin(page: Page, email: string, password: string) {
  await page.goto('/login')

  // Wait until the login page is fully loaded
  await page.waitForURL('/login')

  const emailInput = page.locator('input#email')
  await emailInput.fill(email)

  const passwordInput = page.locator('input#password')
  await passwordInput.fill(password)

  const submitButton = page.locator('button[type="submit"]')
  await submitButton.click()

  // Ensure successful navigation to the home page
  await page.waitForURL('/')
}
