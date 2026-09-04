import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'GENESIS',
  tagline: 'Sanketa I : Kali Agamana',
  favicon: 'img/genesis.ico',
  url: 'https://localhost',
  baseUrl: '/genesis/',
  organizationName: 'GenesisProject',
  projectName: 'genesis',
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
      title: 'GENESIS',
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
            {label: 'GENESIS', to: '/'},
            {label: 'Sanketa I : Kali Agamana', to: '/about'},
          ],
        },
      ],
      copyright:
        'GENESIS · All Rights Reserved.',
    },
  },
};

export default config;
