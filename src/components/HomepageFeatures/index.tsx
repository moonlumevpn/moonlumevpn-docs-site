import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Markdown Source of Truth',
    description: (
      <>
        Documentation is maintained in the separate
        <code>moonlumevpn-docs</code> repository as clean, version-controlled
        Markdown.
      </>
    ),
  },
  {
    title: 'Automated Sync and Build',
    description: (
      <>
        GitHub Actions in this repository fetches docs content on each
        deployment trigger and rebuilds the static site automatically.
      </>
    ),
  },
  {
    title: 'GitHub Pages Delivery',
    description: (
      <>
        The generated site is published to GitHub Pages and served from
        <code>docs.moonlumevpn.ru</code>.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <article className={styles.featureCard}>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </article>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
