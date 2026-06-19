import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://greatcorrectandglory.github.io",
  integrations: [sitemap()],
  output: "static"
});
