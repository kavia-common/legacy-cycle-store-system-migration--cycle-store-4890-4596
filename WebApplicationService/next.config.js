const isDev = process.env.NODE_ENV !== 'production';

const ContentSecurityPolicy = `
default-src 'self';
script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''};
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self' ${process.env.NEXT_PUBLIC_API_BASE_URL || ''};
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
`.replace(/\n/g, ' ').trim();

/**
 * PUBLIC_INTERFACE
 * Next.js configuration with secure headers for compliance and security hardening.
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
