import { Outlet, matchPath, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import { ModalProvider } from 'hooks/useModal';
import Footer from './Footer';
import Navbar from './Navbar';

export const Layout: React.FC = () => {
  const location = useLocation();

  const isFullScreen =
    !!matchPath('/page-carto/:id/edit', location.pathname) ||
    !!matchPath('/page-carto/:id/', location.pathname);
  return (
    <div className="min-h-screen">
      <ModalProvider>
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
      </ModalProvider>
    </div>
  );
};
