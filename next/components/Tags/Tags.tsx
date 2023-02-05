import { Tag } from '@prisma/client';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
import { Config } from '../../config';
import { MediaQuery, MediaQuerySize } from '../../models/MediaQuery';

import classes from './Tags.module.scss';

export interface TagsProps {
  tags?: Tag[];
  basePath?: string;
  scrollable?: boolean;
  showMore?: boolean;
}

const Tags: FC<TagsProps> = ({ tags, basePath, scrollable = true, showMore = false }) => {
  const [tagsToDisplay, setTagsToDisplay] = useState(Config.TAGS_TO_DISPLAY_ON_RECIPE.mobile);
  const [showMoreTags, setShowMoreTags] = useState(false);

  const smallMinMediaQueryHandler = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) return setTagsToDisplay(Config.TAGS_TO_DISPLAY_ON_RECIPE.desktop);

    setTagsToDisplay(Config.TAGS_TO_DISPLAY_ON_RECIPE.mobile);
  }, []);

  useEffect(() => {
    const mediaQuery = new MediaQuery(MediaQuerySize.MIN_SM, smallMinMediaQueryHandler).executeIfMatches();

    return () => mediaQuery.remove();
  }, [smallMinMediaQueryHandler]);

  if (!tags?.length) return null;

  let tagsMarkup = tags?.map((tag) => (
    <span style={{ backgroundColor: tag.color }} key={tag.id} className={classes.tag}>
      {tag.name}
    </span>
  ));

  if (basePath) {
    tagsMarkup = tags?.map((tag) => (
      <Link key={tag.id} href={`${basePath}/${tag.slug}`}>
        <span style={{ backgroundColor: tag.color }} className={classes.tag}>
          {tag.name}
        </span>
      </Link>
    ));
  }

  let remainingTags = 0;

  if (showMore) {
    scrollable = false;
    // gets the number of tags that can't be displayed
    remainingTags = tags.length - tagsToDisplay;
    tagsMarkup = tagsMarkup.slice(0, tagsToDisplay);
  }

  const remainingTagsNames = tags
    .slice(tagsToDisplay)
    .map((tag) => tag.name)
    .join(', ');

  const onMoreTagsClick = () => setShowMoreTags(!showMoreTags);

  let moreTagsMarkup = null;

  if (remainingTags > 0) {
    const showMoreTagsText = showMoreTags ? '' : `+ ${remainingTags}`;
    moreTagsMarkup = (
      <button
        onClick={onMoreTagsClick}
        type="button"
        title={remainingTagsNames}
        className={`${classes.tag} ${classes.more_tags} ${showMoreTags ? 'diet-before-cross' : ''}`}>
        {showMoreTagsText}
      </button>
    );
  }

  const remainingTagsMarkup = tags.slice(tagsToDisplay).map((tag) => (
    <Link key={tag.id} href={`${basePath}/${tag.slug}`}>
      <span style={{ backgroundColor: tag.color }} key={tag.id} className={classes.tag}>
        {tag.name}
      </span>
    </Link>
  ));

  return (
    <div
      className={`
      ${classes.container}
      ${scrollable ? classes.scrollable : ''}
      `}>
      {tagsMarkup} {moreTagsMarkup}
      <div className={`${classes.remaining_tags} ${showMoreTags ? classes.visible : classes.hidden}`}>
        {remainingTagsMarkup}
      </div>
    </div>
  );
};

export default Tags;
