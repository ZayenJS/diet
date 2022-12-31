import Link from 'next/link';
import { FC } from 'react';

import classes from './Navigation.module.scss';

export interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <nav className={classes.container}>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href={'/recettes'}>Recettes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
