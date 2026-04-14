import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const docsearchAppId = process.env.DOCSEARCH_APP_ID;
const docsearchApiKey = process.env.DOCSEARCH_API_KEY;
const docsearchIndexName = process.env.DOCSEARCH_INDEX_NAME;
const hasDocSearchConfig = Boolean(
  docsearchAppId && docsearchApiKey && docsearchIndexName,
);

const config: Config = {
  title: 'MoonlumeVPN Docs',
  tagline: 'Документация MoonlumeVPN',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.moonlumevpn.ru',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,

  // Repository metadata used by Docusaurus (for links, etc.).
  organizationName: 'moonlumevpn', // Usually your GitHub org/user name.
  projectName: 'moonlumevpn-docs-site', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/moonlumevpn/moonlumevpn-docs/tree/production/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/moonlumevpn-social-card.png',
    algolia: hasDocSearchConfig
      ? {
          appId: docsearchAppId!,
          apiKey: docsearchApiKey!,
          indexName: docsearchIndexName!,
          contextualSearch: true,
          searchPagePath: 'search',
        }
      : undefined,
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MoonlumeVPN Docs',
      logo: {
        alt: 'MoonlumeVPN',
        src: 'img/moonlumevpn-logo.png',
      },
      items: [
        {
          to: '/docs',
          position: 'left',
          label: 'Документация',
        },
        ...(hasDocSearchConfig
          ? [
              {
                type: 'search' as const,
                position: 'right' as const,
              },
            ]
          : []),
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/moonlumevpn/moonlumevpn-docs-site',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Документация',
          items: [
            {
              label: 'Политика конфиденциальности',
              to: '/docs/legal/privacy_policy/',
            },
          ],
        },
        {
          title: 'Репозитории',
          items: [
            {
              label: 'Контент документации',
              href: 'https://github.com/moonlumevpn/moonlumevpn-docs',
            },
            {
              label: 'Сайт документации',
              href: 'https://github.com/moonlumevpn/moonlumevpn-docs-site',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MoonlumeVPN. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
