import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
