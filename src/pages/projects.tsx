import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {ProjectCard, projects} from '@site/src/components/ProjectCard';
import styles from './projects.module.css';

export default function Projects(): ReactNode {
  return (
    <Layout
      title="Projects"
      description="Projects built by Justin Beckwith">
      <main className={styles.projectsPage}>
        <div className="container">
          <header className={styles.projectsHeader}>
            <h1>Projects</h1>
            <p>Here are some projects I've built over the years.</p>
          </header>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
