import { FC, Key, useRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';

import classes from '../../assets/scss/pages/add-recipe.module.scss';
import Head from 'next/head';
import { APP_NAME } from '../../constants';
import Field from '../../components/Field/Field';
import { Difficulty } from '../../models/Difficulty';
import { Random } from '../../utils/Random';
import { Unit } from '../../models/Unit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient, deleteStep } from '../../store/actions';
import { State } from '../../store/';

interface Props {
  takenRecipeNames: string[];
}

const RecipesPage: FC<Props> = ({ takenRecipeNames = [] }) => {
  const [photoFields, setPhotoFields] = useState<JSX.Element[]>([]);
  const [ingredientFields, setIngredientFields] = useState<JSX.Element[]>([]);
  const [stepFields, setStepFields] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();

  console.log(takenRecipeNames);

  const recipeName = useSelector((state: State) => state.recipes.name);

  const nameAlreadyTaken = takenRecipeNames.includes(recipeName);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  const onAddPhotoField = () => {
    setPhotoFields((photoFields) => [
      ...photoFields,
      <Field key={Random.id()} label="Photo" name="photo" reducerName="recipes" type="file" />,
    ]);
  };

  const onDeletePhotoField = (id: Key | null) => {
    if (!id) return;
    setPhotoFields((photoFields) => photoFields.filter((photoField) => photoField.key !== id));
  };

  const onAddIngredientField = () => {
    const ingredientId = Random.id();
    setIngredientFields((ingredientFields) => [
      ...ingredientFields,
      <div key={ingredientId} className={classes.ingredient_field}>
        <Field label="Nom" name={`ingredients:${ingredientId}:name`} reducerName="recipes" type="text" />
        <Field
          label="Quantité"
          name={`ingredients:${ingredientId}:quantity`}
          reducerName="recipes"
          type="number"
          min={0.01}
          step={0.01}
        />
        <Field label="Unité" name={`ingredients:${ingredientId}:unit`} reducerName="recipes" type="select">
          {Unit.getAll().map((unit) => (
            <option key={unit} value={unit}>
              {Unit.getUnitLabel(unit)}
            </option>
          ))}
        </Field>
      </div>,
    ]);
  };

  const onDeleteIngredientField = (id: Key | null) => {
    if (!id) return;

    setIngredientFields((ingredientFields) => ingredientFields.filter((ingredientField) => ingredientField.key !== id));
    dispatch(deleteIngredient({ id: id.toString() }));
  };

  const onAddStepField = () => {
    const stepId = Random.id();

    setStepFields((stepFields) => [
      ...stepFields,
      <Field key={stepId} name={`steps:${stepId}`} reducerName="recipes" type="textarea" />,
    ]);
  };

  const onDeleteStepField = (id: Key | null) => {
    if (!id) return;

    setStepFields((stepFields) => stepFields.filter((stepField) => stepField.key !== id));
    dispatch(deleteStep({ id: id.toString() }));
  };

  const firstIngredientId = useRef(Random.id()).current;
  const firstStepId = useRef(Random.id()).current;

  return (
    <>
      <Head>
        <title>{APP_NAME} | Ajouter une recette</title>
      </Head>
      <Layout>
        <form onSubmit={onSubmitHandler} className={classes.container}>
          <fieldset className={classes.general}>
            <legend>Informations générales</legend>
            <Field
              name="name"
              reducerName="recipes"
              type="text"
              error={nameAlreadyTaken ? 'Ce nom de recette existe déjà!' : ''}
            />
            <Field name="description" reducerName="recipes" type="textarea" />
            <Field name="difficulty" reducerName="recipes" type="select">
              {Difficulty.getAll().map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {Difficulty.getDifficultyLabel(difficulty)}
                </option>
              ))}
            </Field>
            <div className={classes.row}>
              <Field label="Note" name="rating" reducerName="recipes" type="number" />
              <Field label="Coût" name="cost" reducerName="recipes" type="number" />
              <Field label="Personnes" name="forHowMany" reducerName="recipes" type="number" />
            </div>
            <div className={classes.row}>
              <Field label="Préparation" name="preparationTime" reducerName="recipes" type="number" />
              <Field label="Cuisson" name="cookingTime" reducerName="recipes" type="number" />
              <Field label="Repos" name="restTime" reducerName="recipes" type="number" />
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>Ingrédients</legend>
            <div className={classes.ingredient_field}>
              <Field label="Nom" name={`ingredients:${firstIngredientId}:name`} reducerName="recipes" type="text" />
              <Field
                label="Quantité"
                name={`ingredients:${firstIngredientId}:quantity`}
                reducerName="recipes"
                type="number"
                min={0.01}
                step={0.01}
              />
              <Field label="Unité" name={`ingredients:${firstIngredientId}:unit`} reducerName="recipes" type="select">
                {Unit.getAll().map((unit) => (
                  <option key={unit} value={unit}>
                    {Unit.getUnitLabel(unit)}
                  </option>
                ))}
              </Field>
            </div>
            {ingredientFields.map((ingredientField) => (
              <div key={ingredientField.key} className={classes.ingredientField}>
                {ingredientField}
                <button className={`${classes.button}`} onClick={() => onDeleteIngredientField(ingredientField.key)}>
                  Supprimer
                </button>
              </div>
            ))}
            <button className={`${classes.button}`} onClick={onAddIngredientField}>
              Ajouter un ingrédient
            </button>
          </fieldset>
          <hr />
          <fieldset className={classes.macros}>
            <legend>Macros</legend>
            <Field label="Calories" name="calories" reducerName="recipes" type="number" />
            <Field label="Protéines" name="protein" reducerName="recipes" type="number" />
            <Field label="Lipides" name="fat" reducerName="recipes" type="number" />
            <Field label="Lipides saturés" name="saturated" reducerName="recipes" type="number" />
            <Field label="Glucides" name="carbs" reducerName="recipes" type="number" />
            <Field label="Sucres" name="sugar" reducerName="recipes" type="number" />
          </fieldset>
          <hr />
          <fieldset>
            <legend>Etapes</legend>
            <div>
              1.
              <Field name={`steps:${firstStepId}`} reducerName="recipes" type="textarea" />
            </div>
            {stepFields.map((stepField, i) => (
              <div key={stepField.key}>
                {i + 2}.{stepField}
                <button className={`${classes.button}`} onClick={() => onDeleteStepField(stepField.key)}>
                  Supprimer
                </button>
              </div>
            ))}
            <button className={`${classes.button}`} onClick={onAddStepField}>
              Ajouter une étape
            </button>
          </fieldset>
          <hr />
          <fieldset>
            <legend>Photos</legend>
            <Field label="Miniature" name="thumbnail" reducerName="recipes" type="file" />

            {photoFields.map((photoField) => (
              <div key={photoField.key}>
                {photoField}
                <button className={`${classes.button}`} onClick={() => onDeletePhotoField(photoField.key)}>
                  Supprimer
                </button>
              </div>
            ))}
            <button className={`${classes.button}`} onClick={onAddPhotoField}>
              Ajouter une photo
            </button>
          </fieldset>
          <button className={classes.button}>Ajouter</button>
        </form>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany({
    select: {
      name: true,
    },
  });

  return {
    props: {
      takenRecipeNames: recipes.map((p) => p.name.toLowerCase()),
    },
  };
};

export default RecipesPage;
