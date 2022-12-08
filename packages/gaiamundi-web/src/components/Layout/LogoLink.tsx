import InvertedLogo from 'components/Icons/InvertedLogo';
import Logo from 'components/Icons/Logo';
import { Link } from 'react-router-dom';

export const LogoLink = ({
  isInverted = false,
}: {
  isInverted?: boolean;
}): JSX.Element => {
  return <Link to="/">{!isInverted ? <Logo /> : <InvertedLogo />}</Link>;
};
