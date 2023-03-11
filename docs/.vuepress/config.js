module.exports = {
  title: 'Nodejs learning',
  description: 'Just playing around',
  base: '/nodejs-learn/',
  themeConfig: {
    nextLinks: true,
    prevLinks: true,
    colorMode: 'dark',
    colorModeSwitch: true,
    docsRepo: 'rajratnamaitry/nodejs-learn',
    repo: 'rajratnamaitry/nodejs-learn',
    docsDir: 'docs',
    smoothScroll: true,
    displayAllHeaders: true,
    sidebar: 'auto',
    searchPlaceholder: 'Search...',
    nav: [
      { text: 'Event loop', link: '/' },
      { text: 'Basics', link: '/topics/basics.html' },
      { text: 'Express', link: '/topics/express.html' },
      { text: 'Mongo DB', link: '/topics/mongodb.html' }
    ]
  }
}