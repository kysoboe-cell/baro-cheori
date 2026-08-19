import type { NextConfig } from "next";

const OLD_HOST = "baro-cheori.kysoboe.workers.dev";
const NEW_ORIGIN = "https://barocheori.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 옛 주소(workers.dev)로 들어온 방문자·검색엔진을 새 도메인으로 영구 이동
      // 루트(/)는 `:path*` 가 빈 값이라 치환되지 않으므로 따로 처리한다
      {
        source: "/",
        has: [{ type: "host", value: OLD_HOST }],
        destination: `${NEW_ORIGIN}/`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: OLD_HOST }],
        destination: `${NEW_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
