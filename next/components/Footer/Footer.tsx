import { FC } from 'react';

import classes from './Footer.module.scss';

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return <footer className={classes.container}>&hearts;</footer>;
};

export default Footer;
