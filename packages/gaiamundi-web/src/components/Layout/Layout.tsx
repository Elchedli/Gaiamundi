import { Outlet, matchPath, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import classNames from 'classnames';

export const Layout: React.FC = () => {
  const location = useLocation();

  const isFullScreen = !!matchPath('/page-carto/:id/edit', location.pathname);
  return (
    <div className="min-h-screen">
      {!isFullScreen && <Navbar isFluid={false} />}
      <div
        className={classNames(
          isFullScreen
            ? 'w-screen h-screen overflow-hidden'
            : 'sm:px-6 lg:px-8 mx-auto max-w-7xl'
        )}
      >
        {isFullScreen && <Navbar isFluid={true} />}
        <Outlet />
      </div>
      {!isFullScreen && <Footer />}
    </div>
  );
};
