import { NextResponse } from 'next/server'
import signIn from '@/app/actions/signIn'

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const { email, password } = await request.json()

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      )
    }

    // Call the signIn function with the provided credentials
    const { success, error } = await signIn({ email, password })

    // If authentication fails, return an error
    if (!success) {
      return NextResponse.json(
        {
          error: `Invalid email or password: ${email}  - ${password} with error ${JSON.stringify(
            error,
          )}`,
        },
        { status: 401 },
      )
    }

    // If authentication is successful, return success response
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during authentication:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
