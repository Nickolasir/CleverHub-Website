/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cleverhub.space",
  generateRobotsTxt: false, // We have a manual robots.txt
  generateIndexSitemap: false,
  outDir: "public",
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : ["/cleverhome", "/cleverhost", "/cleverbuilding", "/cleveraide"].includes(path) ? 0.8 : 0.6,
    lastmod: new Date().toISOString(),
  }),
};
