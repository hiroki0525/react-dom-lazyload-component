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
              fallback='Invisible'
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
              fallback='Invisible'
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
        <LazyLoad id='suspense' fallback='Invisible' margin='200px' suspense>
          <SuspenseExample />
        </LazyLoad>
      </section>
      <ForceVisibleExample />
    </>
  );
}
