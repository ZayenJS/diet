import Link from 'next/link';
import { FC } from 'react';
import { Random } from '../../utils/Random';

import classes from './Pagination.module.scss';

export interface PaginationProps {
  page: number;
  pages: number;
  path: string;
  goToExtremity?: boolean; // TODO: add this feature to go to the first or last page with a button
}

const Pagination: FC<PaginationProps> = ({ path, page, pages, goToExtremity }) => {
  const pageNumberButtons = [];

  for (let i = 1; i <= pages; i++) {
    pageNumberButtons.push(
      <Link
        key={Random.string(10)}
        className={`${classes.page_button} ${i === page ? classes.active : ''}`}
        href={`${path}?page=${i}`}>
        {i}
      </Link>,
    );
  }

  const firstButton = page > 1 && (
    <Link className={`${classes.previous} diet-before-left-arrow-double`} href={`${path}?page=1`} />
  );

  const previousButton = page > 1 && (
    <Link className={`${classes.previous} diet-before-left-arrow`} href={`${path}?page=${Number(page) - 1}`} />
  );

  const nextButton = page < pages && (
    <Link className={`${classes.previous} diet-before-right-arrow`} href={`${path}?page=${Number(page) + 1}`} />
  );

  const lastButton = page < pages && (
    <Link className={`${classes.previous} diet-before-right-arrow-double`} href={`${path}?page=${pages}`} />
  );

  return (
    <div className={classes.container}>
      {goToExtremity && firstButton}
      {previousButton}
      <div className={classes.page_buttons}>{pageNumberButtons}</div>
      {nextButton}
      {goToExtremity && lastButton}
    </div>
  );
};

export default Pagination;
