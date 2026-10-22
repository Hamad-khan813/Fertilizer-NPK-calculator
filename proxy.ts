import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const validCropPages = new Set([
    'tomato', 'corn', 'wheat', 'potato', 'soybean', 'rice', 'bermudagrass', 'bluegrass',
  ]);

  const cropUnitRoute = pathname.match(/^\/calculator\/([^/]+)\/([^/]+)(?:\/.*)?$/);
  if (cropUnitRoute) {
    const [, crop] = cropUnitRoute;
    const destination = validCropPages.has(crop) ? `/calculator/${crop}` : '/calculator';
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  const fertilizerRedirects: Record<string, string> = {
    '/fertilizers/map-12-61-0': '/fertilizers/map-11-52-0',
    '/fertilizers/ammonium-phosphate-11-48-0': '/fertilizers/map-11-52-0',
    '/fertilizers/calcium-nitrate-15-0-0': '/fertilizers/calcium-nitrate-15-5-0-0',
    '/fertilizers/potassium-nitrate-14-0-44': '/fertilizers/potassium-nitrate-13-0-46',
  };

  const fertilizerDestination = fertilizerRedirects[pathname];
  if (fertilizerDestination) {
    return NextResponse.redirect(new URL(fertilizerDestination, request.url), 301);
  }

  // --- Unit System Detection (existing logic) ---
  let response: NextResponse;
  const cookieSystem = request.cookies.get('unit-system')?.value;

  if (cookieSystem) {
    response = NextResponse.next({ request });
  } else {
    // Determine country from Vercel edge header, fallback to US
    const country = request.headers.get('x-vercel-ip-country') || 'US';
    const imperialCountries = ['US', 'CA', 'GB'];
    const defaultSystem = imperialCountries.includes(country) ? 'imperial' : 'metric';

    response = NextResponse.next({ request });
    response.cookies.set('unit-system', defaultSystem, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax'
    });
  }

  // --- Supabase Auth Session Refresh ---
  // Only run if Supabase env vars are configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            // Re-create response to carry forward updated cookies
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh the session token silently
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, robots.txt, sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};

