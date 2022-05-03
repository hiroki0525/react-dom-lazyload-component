import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LazyLoad from 'react-dom-lazyload-component';
import './index.css';

const lazyLoadRender = (isVisible: boolean): string =>
  isVisible ? 'Visible' : 'Invisible';

const App = () => (
  <StrictMode>
    <section>
      <h1>Demo</h1>
      <section>
        <h2>once is true</h2>
        <ul id='onceIsTrue' className='scrollList'>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={`demo1-${index}`}
              render={lazyLoadRender}
              rootId='onceIsTrue'
              as='li'
              className='row'
            />
          ))}
        </ul>
      </section>
      <section>
        <h2>once is false</h2>
        <ul id='onceIsFalse' className='scrollList'>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={`demo2-${index}`}
              render={lazyLoadRender}
              rootId='onceIsFalse'
              as='li'
              className='row'
              once={false}
            />
          ))}
        </ul>
      </section>
    </section>
  </StrictMode>
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('root element cannot be found.');
}

const root = createRoot(rootElement);

root.render(<App />);
