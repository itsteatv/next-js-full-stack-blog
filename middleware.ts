import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "de", "ru", "zh"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(fr|en|de|ru|zh)/:path*"],
};
