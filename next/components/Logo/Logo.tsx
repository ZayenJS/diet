import Image from 'next/image';
import { FC } from 'react';

import classes from './Logo.module.scss';
import logo from '../../assets/img/logo.svg'

export interface LogoProps {}

// https://www.graphicsprings.com/start-your-logo

const Logo: FC<LogoProps> = () => {
  return (
      <Image className={classes.container} src={logo} alt='' />
  );
};

export default Logo;
