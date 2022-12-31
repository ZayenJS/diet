import Link from 'next/link';
import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import { Difficulty } from '../../models/Difficulty';
import { Time } from '../../utils/Time';

import classes from './Recipe.module.scss';

export interface RecipeProps {
  recipe: FullRecipe;
  detailed?: boolean;
}

const Recipe: FC<RecipeProps> = ({ recipe, detailed = false }) => {
  if (!detailed) {
    const difficulyClassName = Difficulty.getDifficultyClassName(recipe.difficulty);
    const difficultyMarkup = Difficulty.getDifficultyMarkup(
      recipe.difficulty,
      `${classes[difficulyClassName]} diet-before-chef`,
    );

    return (
      <div key={recipe.id} className={classes.container}>
        <Link href={`/recettes/${recipe.id}`}>
          <strong className={classes.title}>{recipe.name}</strong>
        </Link>
        <Link href={`/recettes/${recipe.id}`}>
          <img className={classes.thumbnail} src={recipe.thumbnailUrl} alt={''} />
        </Link>
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
      <p>{recipe.calories} calories</p>
      <p>{recipe.protein} protein</p>
      <p>{recipe.carbs} carbohydrates</p>
      <p>{recipe.sugar} sugar</p>
      <p>{recipe.fat} fat</p>
      <p>{recipe.saturated} saturated fat</p>
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
