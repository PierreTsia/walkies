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

  authenticatedTest(
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

/*
test.describe('Authenticated Tests', () => {
  const URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
  test.beforeEach(async ({ context, page }) => {
    const response = await page.request.post(`${URL}/api/auth/login`, {
      data: {
        email: process.env.TEST_ADMIN_USER_EMAIL,
        password: process.env.TEST_ADMIN_USER_PASSWORD,
      },
    })


    // Get cookies from the response
    // Check if login was successful
    expect(response.ok()).toBeTruthy();

    // Extract cookies from the response headers (if they are set there)
    const sessionCookies = (await response.headersArray())
      .filter(header => header.name.toLowerCase() === 'set-cookie')
      .map(header => header.value)
      .map(cookieStr => {
        // Parse cookie string into an object
        const [nameValue, ...attributes] = cookieStr.split('; ');
        const [name, value] = nameValue.split('=');
        return {
          name,
          value,
          domain: 'localhost',
          path: '/',
          httpOnly: attributes.includes('HttpOnly'),
          secure: attributes.includes('Secure'),
        };
      });

    // Add extracted cookies to the browser context
    await context.addCookies(sessionCookies);


    // Navigate to the protected page
    await page.goto('/')
  })

  test('should access protected content', async ({ page }) => {
    await expect(page).toHaveURL('/')
    await expect(page.locator('text=Hey, pierre.tsiakkaros@gmail.com! ')).toBeVisible()
  })
})
*/
