/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: "interest-cohort=(), browsing-topics=(), join-ad-interest-group=(), run-ad-auction=(), private-state-token-redemption=(), private-state-token-issuance=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
