import { Link } from 'react-router-dom';

import Facebook from 'components/Icons/Facebook';
import Github from 'components/Icons/Github';
import Instagram from 'components/Icons/Instagram';
import Twitter from 'components/Icons/Twitter';

const anonymousMenuItems = [
  { title: 'Accueil', href: '/#' },
  { title: 'Blog', href: '/blog' },
  { title: 'Fonctionnalités', href: '/#features' },
  { title: 'Documentation', href: '/#docs' },
  { title: 'Equipe', href: '/#team' },
];

const Footer = (): JSX.Element => {
  const menuItems = anonymousMenuItems;
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          {menuItems.map(({ title, href }) => {
            return (
              <div className="px-5 py-2" key={title}>
                <Link
                  to={href}
                  className="text-base leading-6 text-gray-600 hover:text-gray-800"
                >
                  {title}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="mt-8 flex justify-center">
          <a
            href="https://gitlab.com/gaia-mundi/gaia-mundi"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Github</span>
            <Github className="h-6 w-6" />
          </a>
          <a href="" className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </a>
          <a href="" className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a href="" className="ml-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
