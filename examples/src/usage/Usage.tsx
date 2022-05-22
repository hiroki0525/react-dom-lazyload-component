import LazyLoad from 'react-dom-lazyload-component';
import { lazy } from 'react';
import ForceVisibleExample from './ForceVisibleExample';

const SuspenseExample = lazy(() => import('./SuspenseExample'));

export default function Usage() {
  return (
    <>
      <h1>Usage</h1>
      <section>
        <h2>default</h2>
        <ul id='onceIsTrue' className='scrollList'>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={`demo1-${index}`}
              InvisibleComponent='Invisible'
              rootId='onceIsTrue'
              as='li'
              className='row'
            >
              Visible
            </LazyLoad>
          ))}
        </ul>
      </section>
      <section>
        <h2>once is false</h2>
        <ul id='onceIsFalse' className='scrollList'>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={`demo2-${index}`}
              InvisibleComponent='Invisible'
              rootId='onceIsFalse'
              as='li'
              className='row'
              once={false}
            >
              Visible
            </LazyLoad>
          ))}
        </ul>
      </section>
      <section>
        <h2>Suspense</h2>
        <LazyLoad
          id='suspense'
          InvisibleComponent='Invisible'
          rootMargin='200px 0px'
        >
          <SuspenseExample />
        </LazyLoad>
      </section>
      <ForceVisibleExample />
      <section>
        <h2>autoCalculateHeight is true</h2>
        <ul id='autoCalculateHeight' className='scrollList'>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={`demo4-${index}`}
              InvisibleComponent='Invisible'
              rootId='autoCalculateHeight'
              as='li'
              autoCalculateHeight
            >
              <div className='row'>Visible</div>
            </LazyLoad>
          ))}
        </ul>
      </section>
    </>
  );
}
