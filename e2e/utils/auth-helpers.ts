import { APIRequestContext, BrowserContext } from '@playwright/test'

export async function authenticateUser(
  context: BrowserContext,
  apiRequest: APIRequestContext,
  email: string,
  password: string,
) {
  const URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const response = await apiRequest.post(`${URL}/api/auth/login`, {
    data: { email, password },
  })

  if (!response.ok())
    throw new Error(
      `Login failed with status ${response.status()}: ${await response.text()}`,
    )

  const sessionCookies = (await response.headersArray())
    .filter((header) => header.name.toLowerCase() === 'set-cookie')
    .map((header) => {
      const [nameValue, ...attributes] = header.value.split('; ')
      const [name, value] = nameValue.split('=')
      return {
        name,
        value,
        domain: 'localhost',
        path: '/',
        httpOnly: attributes.includes('HttpOnly'),
        secure: attributes.includes('Secure'),
      }
    })

  await context.addCookies(sessionCookies)
}
