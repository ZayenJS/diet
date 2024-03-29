import Link from 'next/link';
import { FC } from 'react';
import { Config } from '../../config';
import { RouteType } from '../../models/Router';

import classes from './Navigation.module.scss';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const links = Config.router.getRoutesArray(RouteType.NAV).map((route) => (
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
