import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://crossthewall.org",
  base: "/test-platform",
  integrations: [sitemap()],
  output: "static"
});
