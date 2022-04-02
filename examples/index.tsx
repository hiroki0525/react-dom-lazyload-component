import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LazyLoad from '../src';
import './index.css';

const lazyLoadRender = (isVisible: boolean): JSX.Element => {
  return <>{isVisible ? 'Visible!!' : 'InVisible!!'}</>;
};

const rootSelectorId = 'scrollList';

const App = () => {
  return (
    <StrictMode>
      <section>
        <h1>Demo</h1>
        <ul id={rootSelectorId}>
          {[...Array(10)].map((_, index) => (
            <LazyLoad
              key={index}
              render={lazyLoadRender}
              rootSelectorId={rootSelectorId}
              as='li'
              className='row'
            />
          ))}
        </ul>
      </section>
    </StrictMode>
  );
};

// @ts-ignore
const root = createRoot(document.getElementById('root'));

root.render(<App />);
