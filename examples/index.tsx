import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Usage from './src/usage/Usage';
import Layout from './src/Layout';
import Site from './src/site/Site';

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Usage />} />
          <Route path='site' element={<Site />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('root element cannot be found.');
}

const root = createRoot(rootElement);

root.render(<App />);
