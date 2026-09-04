import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'zGenesis',
  tagline: 'Kathana 2 development roadmap',
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
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'zGenesis',
      items: [
        {to: '/', label: 'Roadmap', position: 'left'},
        {
          href: 'https://github.com/AsheshDevelopment/zGenesis',
          label: 'Repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright:
        'Copyleft © 2025–2026 Ashesh Development. All Rights Reversed.',
    },
  },
};

export default config;
