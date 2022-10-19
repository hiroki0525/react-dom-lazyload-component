import LazyLoad from 'react-dom-lazyload-component';
import { useEffect, useState } from 'react';

export default function ForceVisibleExample() {
  const [forceVisible, setForceVisible] = useState(false);
  const timeout = 5000;

  useEffect(() => {
    const timeId = setTimeout(() => {
      setForceVisible(true);
    }, timeout);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <section>
      <h2>forceVisible</h2>
      <p>Visible after {timeout} ms.</p>
      <ul id='forceVisible' className='scrollList'>
        {[...Array(5)].map((_, index) => (
          <LazyLoad
            key={`demo3-${index}`}
            fallback='Invisible'
            rootId='forceVisible'
            as='li'
            className='row'
            rootMargin='-1000px 0px'
            forceVisible={forceVisible}
          >
            Visible
          </LazyLoad>
        ))}
      </ul>
    </section>
  );
}
