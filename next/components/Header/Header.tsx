import { FC } from 'react';
import Navigation from '../Navigation/Navigation';
import Search from '../Search/Search';

import classes from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className={classes.container}>
      <div>
        <strong>BRAND</strong>
        <span>LOGO</span>
      </div>
      <Search />
      <Navigation />
    </header>
  );
};

export default Header;
