import Link from 'next/link';
import { FC } from 'react';
import { APP_NAME } from '../../constants';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';

import classes from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className={classes.container}>
      <Link className={classes.brand} href="/">
        <Logo />
        <strong>
          {APP_NAME}
        </strong>
      </Link>
      <Search />
      <Navigation />
    </header>
  );
};

export default Header;
