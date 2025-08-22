import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type {WrapperProps} from '@docusaurus/types';
import {DiscussionEmbed} from 'disqus-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): JSX.Element {
  return (
    <>
      <BlogPostPage {...props} />
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <BlogPostDisqus />
          </div>
        </div>
      </div>
    </>
  );
}

function BlogPostDisqus(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  
  // Try to get blog post info from the current location
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const permalink = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const disqusShortname = '53bytes';
  const disqusConfig = {
    url: currentUrl,
    identifier: permalink,
    title: typeof document !== 'undefined' ? document.title : 'Blog Post',
  };

  return (
    <div style={{marginTop: '2rem'}}>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}