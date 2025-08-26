import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroBox}>
          <div className={styles.heroImageContainer}>
            <img src="img/cartoon_me.png" alt="Justin Beckwith" className={styles.heroImage} width={400} height={400} />
            <div className={styles.imageCredit}>
              Illustration by <a href="https://www.linkedin.com/in/heyobrooke/" target="_blank" rel="noopener noreferrer">Brooke Travis</a>
            </div>
          </div>
          <div className={styles.heroText}>
            <header className={styles.heroTitle}>Justin Beckwith</header>
            <ul>
              <li>🛠️ Leader of builders</li>
              <li>🤖 Developer of bots</li>
              <li>🍝 Free hugs and baked ziti</li>
            </ul>
            <Link
              className={`button button--lg hero-blog-button ${styles.heroButton}`}
              to="/blog">
              To the blog →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Justin Beckwith - Director of Engineering @ Discord">
      <HomepageHeader />
    </Layout>
  );
}