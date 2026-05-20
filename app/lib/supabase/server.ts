import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Return a dummy client to handle missing environment variables gracefully
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: new Error('Supabase environment variables are not configured.') }),
        getSession: async () => ({ data: { session: null }, error: new Error('Supabase environment variables are not configured.') }),
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('Supabase environment variables are not configured.') }),
        insert: () => Promise.resolve({ data: null, error: new Error('Supabase environment variables are not configured.') }),
        update: () => Promise.resolve({ data: null, error: new Error('Supabase environment variables are not configured.') }),
        delete: () => Promise.resolve({ data: null, error: new Error('Supabase environment variables are not configured.') }),
      })
    } as any;
  }

  const cookieStore = await cookies()

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
