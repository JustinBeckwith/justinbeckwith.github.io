import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
};

export const projects: Project[] = [
  {
    title: '🐿 linkinator',
    description: 'A super simple site crawler and broken link checker. Easily perform scans on remote sites or local files, with support for recursion, redirects, and tons of configuration options.',
    image: '/img/linkinator.webp',
    link: '/projects/linkinator',
    github: 'https://github.com/JustinBeckwith/linkinator',
  },
  {
    title: 'linkinator-mcp',
    description: 'A Model Context Protocol (MCP) server that enables AI assistants like Claude to perform link validation. Scan websites and local files for broken links with comprehensive crawling and reporting.',
    image: '/img/linkinator-mcp.webp',
    link: '/projects/linkinator-mcp',
    github: 'https://github.com/JustinBeckwith/linkinator-mcp',
  },
  {
    title: 'linkinator-action',
    description: 'A GitHub Action that checks your markdown files for broken links. Automatically validate links in CI/CD with support for fragments, CSS, HTTPS enforcement, and comprehensive retry logic.',
    image: '/img/linkinator-action.webp',
    link: '/projects/linkinator-action',
    github: 'https://github.com/JustinBeckwith/linkinator-action',
  },
  {
    title: 'retry-axios',
    description: 'Use Axios interceptors to automatically retry failed requests. Super flexible with built-in exponential backoff.',
    image: '/img/retry-axios.webp',
    link: '/projects/retry-axios',
    github: 'https://github.com/JustinBeckwith/retry-axios',
  },
  {
    title: 'twinklyjs',
    description: 'An unofficial TypeScript implementation for Twinkly Lights. Control your smart lights via CLI or programmatic API with support for discovery, colors, modes, and realtime updates.',
    image: '/img/twinkly.webp',
    link: '/projects/twinklyjs',
    github: 'https://github.com/twinklyjs/twinklyjs',
  },
  {
    title: 'fileinator',
    description: 'Generate files full of random bytes for testing purposes. Available as both a CLI tool and library with support for human-readable sizes, progress tracking, and event-based callbacks.',
    image: '/img/fileinator.webp',
    link: '/projects/fileinator',
    github: 'https://github.com/JustinBeckwith/fileinator',
  },
];

export function ProjectCard({title, description, image, link, github}: Project) {
  return (
    <div className={styles.projectCard}>
      <Link to={link} className={styles.projectCardLink}>
        <div className={styles.projectImageContainer}>
          <img src={image} alt={title} className={styles.projectImage} />
        </div>
        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{title}</h3>
          <p className={styles.projectDescription}>{description}</p>
        </div>
      </Link>
      <div className={styles.projectFooter}>
        <Link to={link} className={styles.projectButton}>
          View Project →
        </Link>
        <a href={github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          GitHub →
        </a>
      </div>
    </div>
  );
}
