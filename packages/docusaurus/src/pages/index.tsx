import {useHistory}            from '@docusaurus/router';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import useDocusaurusContext    from '@docusaurus/useDocusaurusContext';
import Layout                  from '@theme/Layout';
import HomepageFeatures        from '@yarnpkg/docusaurus/src/components/HomepageFeatures';
import React                   from 'react';

import {StarrySky}             from '../components/StarrySky';

import styles                  from './index.module.css';

// eslint-disable-next-line arca/no-default-export
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    history.push(`/packages?q=${encodeURIComponent(event.target.value)}`);
  };

  return (
    <Layout
      title={`Home page`}
      description={siteConfig.tagline}>
      <HtmlClassNameProvider className={styles.html}>
        <main className={styles.main}>
          <div className={styles.reserve}>
            <div className={styles.art}>
              <StarrySky/>
            </div>
            <div className={styles.hero}>
              <h1>Safe, stable,<br />reproducible projects</h1>
              <p>Yarn is a package manager that doubles down as project manager. Whether you work on simple projects or industry monorepos, whether you're an open source developer or an enterprise user, Yarn has your back.</p>
              <input className={styles.search} placeholder={`Search packages (i.e. babel, webpack, react, ...)`} autoFocus={true} onChange={handleChange}/>
            </div>
          </div>
          <div className={styles.followUp}>
            <HomepageFeatures />
          </div>
        </main>
      </HtmlClassNameProvider>
    </Layout>
  );
}
