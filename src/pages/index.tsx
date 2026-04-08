import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout title="Moonlume VPN Docs" description="Документация Moonlume VPN.">
      <main className={styles.page}>
        <section className={clsx('hero hero--primary', styles.heroBanner)}>
          <div className="container">
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>Документация Moonlume VPN</p>
              <Heading as="h1" className={styles.heroTitle}>
                Moonlume VPN - безопасный и приватный доступ в интернет
              </Heading>
              <p className={styles.heroSubtitle}>
                VPN помогает защитить трафик, скрыть IP и безопасно пользоваться
                интернетом в любой сети. Здесь собрано понятное объяснение, как
                работает VPN, зачем он нужен и как использовать Moonlume VPN в
                повседневных задачах.
              </p>
              <div className={styles.heroMeta}>
                <span>RU-first документация</span>
                <span>Простой onboarding</span>
                <span>Поддержка через Telegram</span>
              </div>
              <div className={styles.heroActions}>
                <Link className="button button--lg button--secondary" to="/docs/legal/privacy_policy/">
                  Открыть документацию
                </Link>
                <a
                  className="button button--lg button--outline button--secondary"
                  href="https://web.moonlumevpn.ru"
                  target="_blank"
                  rel="noreferrer">
                  Перейти в Web App
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.linksSection}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className={styles.sectionKicker}>Каналы доступа</p>
              <Heading as="h2">Все сервисы Moonlume в одном месте</Heading>
            </div>
            <div className="row">
              <div className="col col--4">
                <a className={styles.linkCard} href="https://moonlumevpn.ru" target="_blank" rel="noreferrer">
                  <Heading as="h3">Сайт</Heading>
                  <p>Общая информация о продукте и тарифах.</p>
                  <span>moonlumevpn.ru</span>
                </a>
              </div>
              <div className="col col--4">
                <a className={styles.linkCard} href="https://web.moonlumevpn.ru" target="_blank" rel="noreferrer">
                  <Heading as="h3">Веб-приложение</Heading>
                  <p>Личный кабинет и управление подпиской.</p>
                  <span>web.moonlumevpn.ru</span>
                </a>
              </div>
              <div className="col col--4">
                <a className={styles.linkCard} href="https://t.me/moonlumevpn_bot" target="_blank" rel="noreferrer">
                  <Heading as="h3">Telegram-бот</Heading>
                  <p>Быстрый старт и подключение через Telegram.</p>
                  <span>@moonlumevpn_bot</span>
                </a>
              </div>
              <div className="col col--6">
                <a className={styles.linkCard} href="https://t.me/moonlumevpn_news" target="_blank" rel="noreferrer">
                  <Heading as="h3">Новости</Heading>
                  <p>Обновления сервиса и важные объявления.</p>
                  <span>@moonlumevpn_news</span>
                </a>
              </div>
              <div className="col col--6">
                <a className={styles.linkCard} href="https://t.me/moonlumevpn_support_bot" target="_blank" rel="noreferrer">
                  <Heading as="h3">Поддержка</Heading>
                  <p>Помощь по настройке и решению проблем.</p>
                  <span>@moonlumevpn_support_bot</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className="container">
            <div className={styles.sectionHead}>
              <p className={styles.sectionKicker}>Почему это удобно</p>
              <Heading as="h2">Понятный формат для ежедневного использования</Heading>
            </div>
            <div className={styles.valuesGrid}>
              <article className={styles.valueItem}>
                <p className={styles.valueIndex}>01</p>
                <Heading as="h3">Безопасность трафика</Heading>
                <p>
                  Шифрование снижает риск перехвата данных в публичных и
                  незащищенных сетях.
                </p>
              </article>
              <article className={styles.valueItem}>
                <p className={styles.valueIndex}>02</p>
                <Heading as="h3">Приватность</Heading>
                <p>
                  Скрытие IP помогает минимизировать отслеживание и повышает
                  конфиденциальность.
                </p>
              </article>
              <article className={styles.valueItem}>
                <p className={styles.valueIndex}>03</p>
                <Heading as="h3">Простой старт</Heading>
                <p>
                  Документация объясняет подключение пошагово: от выбора
                  платформы до проверки работы VPN.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
