import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Usage from './src/usage/Usage';
import Layout from './src/Layout';
import Site from './src/site/Site';
import { baseUrl } from './src/util';

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={baseUrl} element={<Layout />}>
          <Route index element={<Usage />} />
          <Route path='site' element={<Site />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

const rootElement = document.getElementById('root')!;

const root = createRoot(rootElement);

root.render(<App />);
