import { Link, Outlet } from 'react-router-dom';
import { baseUrl } from './util';

export default function Layout() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link to={baseUrl}>Usage</Link>
          </li>
          <li>
            <Link to={`${baseUrl}/site`}>Example Site</Link>
          </li>
        </ul>
      </nav>
      <section className='ml-[200px] px-4'>
        <Outlet />
      </section>
    </main>
  );
}
