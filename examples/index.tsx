import { render } from 'react-dom';
import LazyLoad from 'react-lazyload-component';
import './index.css';

const lazyLoadRender = (isVisible: boolean): JSX.Element => {
  return <>{isVisible ? 'Visible!!' : 'InVisible!!'}</>;
};

const rootSelectorId = 'scrollList';

const App = () => {
  return (
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
  );
};
render(<App />, document.getElementById('root'));
