import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';

type DocCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  keywords: string[];
};

type DocGroup = {
  label: string;
  title: string;
  description: string;
  cards: DocCard[];
};

const DOC_GROUPS: DocGroup[] = [
  {
    label: 'Начать здесь',
    title: 'Основная документация',
    description: 'Главные точки входа для настройки и быстрого старта.',
    cards: [
      {
        title: 'Главная документации',
        description: 'Краткий обзор пространства документации MoonlumeVPN.',
        href: '/docs/',
        badge: 'Корень',
        keywords: ['docs', 'home', 'overview', 'root'],
      },
      {
        title: 'Установка и подключение',
        description: 'Пошаговые сценарии настройки для устройств и клиентов.',
        href: '/docs/install/',
        badge: 'Старт',
        keywords: ['install', 'setup', 'connect', 'start', 'vpn'],
      },
    ],
  },
  {
    label: 'Политики',
    title: 'Аккаунт и право',
    description: 'Данные о платежах, условиях использования и конфиденциальности.',
    cards: [
      {
        title: 'Платежи',
        description: 'Как работают оплата подписки и продление.',
        href: '/docs/payments/',
        badge: 'Оплата',
        keywords: ['payments', 'billing', 'subscription', 'pay'],
      },
      {
        title: 'Юридические документы',
        description: 'Политика конфиденциальности, оферта, реферальные правила и условия.',
        href: '/docs/category/юридические-документы/',
        badge: 'Юр.',
        keywords: ['legal', 'privacy', 'offer', 'terms', 'referral'],
      },
    ],
  },
];

export default function Home(): ReactNode {
  const {
    siteConfig: {themeConfig},
  } = useDocusaurusContext();
  const hasDocSearch = Boolean(themeConfig.algolia);

  return (
    <Layout
      title="Привет, чем я могу помочь?"
      description="Ищите в документации MoonlumeVPN и быстро переходите к нужному разделу.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Документация MoonlumeVPN</p>
              <Heading as="h1" className={styles.heroTitle}>
                Привет, чем я могу помочь?
              </Heading>
              <p className={styles.heroLead}>
                Начните поиск ниже.
              </p>
              <p className={styles.heroCopy}>
                Сначала откройте нужный раздел, а затем переходите к конкретной
                инструкции без лишнего шума.
              </p>

              <div className={styles.searchPanel}>
                {hasDocSearch ? (
                  <SearchBar />
                ) : (
                  <Link className={styles.searchFallback} to="/docs/">
                    Открыть документацию
                  </Link>
                )}
              </div>

              <div className={styles.quickFilters} aria-label="Быстрые ссылки">
                <Link className={styles.quickFilter} to="/docs/">
                  документация
                </Link>
                <Link className={styles.quickFilter} to="/docs/install/">
                  установка
                </Link>
                <Link className={styles.quickFilter} to="/docs/payments/">
                  платежи
                </Link>
                <Link
                  className={styles.quickFilter}
                  to="/docs/category/юридические-документы/">
                  юридические
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sections}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <p className={styles.sectionKicker}>Обзор разделов</p>
              <Heading as="h2" className={styles.sectionTitle}>
                Ссылки на основные разделы документации
              </Heading>
              <p className={styles.sectionLead}>
                Это основные входные точки, сгруппированные по тому, что обычно
                нужно в первую очередь.
              </p>
            </div>

            <div className={styles.groupList}>
              {DOC_GROUPS.map(group => (
                <section key={group.title} className={styles.groupBlock}>
                  <div className={styles.groupHeader}>
                    <p className={styles.groupLabel}>{group.label}</p>
                    <div>
                      <Heading as="h3" className={styles.groupTitle}>
                        {group.title}
                      </Heading>
                      <p className={styles.groupDescription}>{group.description}</p>
                    </div>
                  </div>

                  <div className={styles.cardGrid}>
                    {group.cards.map(card => (
                      <Link key={card.href} className={styles.docCard} to={card.href}>
                        <div className={styles.docCardTop}>
                          <span className={styles.docCardBadge}>{card.badge}</span>
                          <span className={styles.docCardArrow} aria-hidden="true">
                            ↗
                          </span>
                        </div>
                        <Heading as="h4" className={styles.docCardTitle}>
                          {card.title}
                        </Heading>
                        <p className={styles.docCardDescription}>{card.description}</p>
                        <span className={styles.docCardFooter}>Открыть раздел</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
