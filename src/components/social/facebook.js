// src/components/social/facebook.js
'use client';

import { useEffect, useRef } from 'react';

// Your page URL (choose one canonical URL)
const PAGE_URL = 'https://www.facebook.com/a4hbangladesh'; 

export default function FacebookEmbed({
  variant = 'page', // 'page' | 'like'
  width = 650,
  //height = 500,
  showTimeline = true,
  smallHeader = false,
  hideCover = false,
  showFaces = true,
  share = true,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    // If the SDK is ready, ask it to parse this subtree again
    if (typeof window !== 'undefined' && window.FB && ref.current) {
      window.FB.XFBML.parse(ref.current);
    }
  }, []);

  return (
    <div ref={ref} className={className}>
      {variant === 'page' ? (
        <div
          className="fb-page"
          data-href={PAGE_URL}
          data-tabs={showTimeline ? 'timeline' : ''}
          data-width={String(width)}
          //data-height={String(height)}
          data-small-header={String(smallHeader)}
          data-adapt-container-width="true"
          data-hide-cover={String(hideCover)}
          data-show-facepile={String(showFaces)}
        >
          <blockquote cite={PAGE_URL} className="fb-xfbml-parse-ignore">
            <a href={PAGE_URL}>Aid For Humanity</a>
          </blockquote>
        </div>
      ) : (
        <div
          className="fb-like"
          data-href={PAGE_URL}
          data-width={String(width)}
          data-layout="standard"
          data-action="like"
          data-size="large"
          data-share={String(share)}
        />
      )}
    </div>
  );
}
