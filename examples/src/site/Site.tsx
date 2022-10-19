import './site.css';
import { getLCP, getFID, getCLS } from 'web-vitals';
import LazyLoad from 'react-dom-lazyload-component';
import { lazy } from 'react';
import Loading from './Loading';
import Main from './Main';

const Footer = lazy(() => import('./Footer'));

export default function Site() {
  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
  return (
    <>
      <header>
        <h1>Cats Lovers</h1>
      </header>
      <Main />
      <LazyLoad fallback={<Loading />} as='footer'>
        <Footer />
      </LazyLoad>
    </>
  );
}
