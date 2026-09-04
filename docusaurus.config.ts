import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'Tantra Genesis: RE',
  tagline: 'Powered by zEngine from Ashesh Development',
  url: 'https://asheshdevelopment.github.io',
  baseUrl: '/zGenesis/',
  organizationName: 'AsheshDevelopment',
  projectName: 'zGenesis',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Tantra Genesis: RE',
      items: [
        {to: '/', label: 'Home', position: 'right'},
        {to: '/about', label: 'About', position: 'right'},
        {to: '/roadmap', label: 'Roadmap', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Explore',
          items: [
            {label: 'Home', to: '/'},
            {label: 'About', to: '/about'},
            {label: 'Roadmap', to: '/roadmap'},
          ],
        },
        {
          title: 'Project',
          items: [
            {label: 'Tantra Genesis: RE', to: '/'},
            {label: 'Powered by zEngine', to: '/about'},
          ],
        },
      ],
      copyright:
        'Copyleft © 2025–2026 Ashesh Development. All Rights Reversed.',
    },
  },
};

export default config;
