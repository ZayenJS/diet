import { Unit } from '@prisma/client';
import Link from 'next/link';
import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import { Difficulty } from '../../models/Difficulty';
import { Time } from '../../utils/Time';
import Tags from '../Tags/Tags';

import classes from './Recipe.module.scss';

export interface RecipeProps {
  recipe: FullRecipe;
  detailed?: boolean;
  scrollableTags?: boolean;
  showMoreTags?: boolean;
}

const Recipe: FC<RecipeProps> = ({ recipe, detailed = false, scrollableTags = true, showMoreTags = false }) => {
  if (!detailed) {
    const difficulyClassName = Difficulty.getDifficultyClassName(recipe.difficulty);
    const difficultyMarkup = Difficulty.getDifficultyMarkup(
      recipe.difficulty,
      `${classes[difficulyClassName]} diet-before-chef`,
    );

    return (
      <div key={recipe.id} className={classes.container}>
        <Link className={classes['title-container']} href={`/recettes/${recipe.id}`}>
          <strong className={classes.title}>{recipe.name}</strong>
        </Link>
        <div className={classes.thumbnail_container}>
          {recipe.thumbnailUrl && (
            <div className={classes.tags_container}>
              <Tags tags={recipe.tags} basePath={'/recettes/tag'} scrollable={scrollableTags} showMore={showMoreTags} />
            </div>
          )}
          <Link href={`/recettes/${recipe.id}`}>
            <img className={classes.thumbnail} src={recipe.thumbnailUrl} alt={''} />
          </Link>
        </div>
        <ul className={classes.list}>
          <li className={`${classes.total_time} diet-before-clock`}>
            {Time.toHoursAndMinutes(recipe.preparationTime + recipe.cookingTime + recipe.restTime)}
          </li>
          <li
            title={Difficulty.getDifficultyLabel(recipe.difficulty)}
            className={classes.difficulty}
            dangerouslySetInnerHTML={{ __html: difficultyMarkup }}
          />
        </ul>
      </div>
    );
  }

  // refactor in separate class + handle case with different units
  // maybe convert eveything to grams first
  const macros = recipe.ingredients?.reduce(
    (acc, ingredient) => {
      console.log({ ingredient });

      const calories = ingredient.product.calories ?? acc.calories;
      const protein = ingredient.product.protein ?? acc.protein;
      const carbs = ingredient.product.carbs ?? acc.carbs;
      const sugar = ingredient.product.sugar ?? acc.sugar;
      const fat = ingredient.product.fat ?? acc.fat;
      const saturatedFat = ingredient.product.saturated ?? acc.saturatedFat;
      const fibers = ingredient.product.fiber ?? acc.fibers;

      if (ingredient.unit === Unit.GRAM) {
        const amount = ingredient.amount / 100;

        acc.totalAmount += ingredient.amount;
        acc.calories += calories * amount;
        acc.protein += protein * amount;
        acc.carbs += carbs * amount;
        acc.sugar += sugar * amount;
        acc.fat += fat * amount;
        acc.saturatedFat += saturatedFat * amount;
        acc.fibers += fibers * amount;

        return acc;
      }

      return acc;
    },
    {
      totalAmount: 0,
      calories: 0,
      protein: 0,
      carbs: 0,
      sugar: 0,
      fat: 0,
      saturatedFat: 0,
      fibers: 0,
    },
  );

  // get total for 100g
  if (macros) {
    const totalAmount = macros.totalAmount / 100;

    macros.calories = macros.calories / totalAmount;
    macros.protein = macros.protein / totalAmount;
    macros.carbs = macros.carbs / totalAmount;
    macros.sugar = macros.sugar / totalAmount;
    macros.fat = macros.fat / totalAmount;
    macros.saturatedFat = macros.saturatedFat / totalAmount;
    macros.fibers = macros.fibers / totalAmount;
    macros.totalAmount = 100;
  }

  console.log({ macros });

  return (
    <div className={classes.container_detailed} key={recipe.id}>
      <strong>{recipe.name}</strong>
      <img src={recipe.thumbnailUrl} alt={''} />
      <p>{recipe.description}</p>
      <li className={`${classes.for_how_many} diet-before-people`}>{recipe.forHowMany}</li>
      <li className={`${classes.cost} diet-after-euro`}>{recipe.cost}</li>
      <p>{recipe.preparationTime} minutes (preparation)</p>
      <p>{recipe.cookingTime} minutes (cooking)</p>
      <p>{recipe.restTime} minutes rest time</p>
      <p>{recipe.difficulty}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients?.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.amount} {ingredient.unit} {ingredient.product.name}
          </li>
        ))}
      </ul>
      <h2>Images</h2>
      <ul>
        {recipe.images?.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={''} />
          </li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ul>
        {recipe.steps?.map((step) => (
          <li key={step.id}>{step.text}</li>
        ))}
      </ul>
      <h2>Tags</h2>
      <ul>
        {recipe.tags?.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <h2>Tools</h2>
      <ul>
        {recipe.tools?.map((tool) => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
