import React, { useState, useEffect, useRef } from 'react';

interface Props {
  className?: string;
  src: string;
  alt?: string | undefined;
  lqip?: string;
  aspectRatio?: number;
}

function LazyImage({ className = '', src, alt, lqip, aspectRatio = 2 / 3 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<any>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={`wrapper-lazy-image ${className}`} style={{ position: 'relative' }}>
      {!loaded && <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />}
      <img src={lqip} aria-hidden="true" />
      <img
        style={{ position: 'absolute' }}
        loading="lazy"
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={`${'source-lazy-image ' + loaded ? 'loaded' : ''}`}
      />
    </div>
  );
}
export default LazyImage;
