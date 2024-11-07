import { Tables } from '@/lib/supabase-types'

export type RegistrationRequest = Tables<'registration_requests'>

export type RegistrationRequestStatus = RegistrationRequest['status']

export type UserType = Tables<'users'>
