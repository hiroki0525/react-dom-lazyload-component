import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link to='/'>Usage</Link>
          </li>
          <li>
            <Link to='/site'>Example Site</Link>
          </li>
        </ul>
      </nav>
      <section className='ml-[200px] px-4'>
        <Outlet />
      </section>
    </main>
  );
}
