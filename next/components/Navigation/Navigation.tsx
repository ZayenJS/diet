import Link from 'next/link';
import { FC } from 'react';
import { Config } from '../../config';

import classes from './Navigation.module.scss';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const links = Config.router.getRoutesArray().map((route) => (
    <li key={route.name}>
      <Link href={route.href}>{route.text}</Link>
    </li>
  ));

  return (
    <nav className={classes.container}>
      <ul>{links}</ul>
    </nav>
  );
};

export default Navigation;
