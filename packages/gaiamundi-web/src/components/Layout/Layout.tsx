import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
