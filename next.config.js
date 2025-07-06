const { i18n } = require('./next-i18next.config');

const securityHeaders = [
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['meta.viewblock.io'],
    disableStaticImages: true,
    dangerouslyAllowSVG: true
  },
  // headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ]
  // }
}

module.exports = nextConfig
