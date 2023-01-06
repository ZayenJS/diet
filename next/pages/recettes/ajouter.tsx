import { FC, Key, useCallback, useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';

import Head from 'next/head';
import { APP_NAME } from '../../constants';
import Field from '../../components/Field/Field';
import { Random } from '../../utils/Random';
import { Unit } from '../../models/Unit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient, deleteStep } from '../../store/actions';
import { State } from '../../store/';
import { prisma } from '../../lib/prisma';

import classes from '../../assets/scss/pages/add-recipe.module.scss';
import { Product } from '@prisma/client';

interface Props {
  takenRecipeNames: string[];
  products: Partial<Product>[];
}

const RecipesPage: FC<Props> = ({ takenRecipeNames = [], products }) => {
  const firstRender = useRef(true);

  const [ingredientFields, setIngredientFields] = useState<JSX.Element[]>([]);
  const [stepFields, setStepFields] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();

  const recipeName = useSelector((state: State) => state.recipes.name);

  const nameAlreadyTaken = takenRecipeNames.includes(recipeName);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
  };

  const onAddIngredientField = useCallback(() => {
    const ingredientId = Random.id();
    setIngredientFields((ingredientFields) => [
      ...ingredientFields,
      <div key={ingredientId} className={classes.ingredient_field}>
        <Field label="Nom" name={`ingredients:${ingredientId}:name`} reducerName="recipes" type="select">
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </Field>
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
  }, [products]);

  const onDeleteIngredientField = (id: Key | null) => {
    if (!id) return;

    setIngredientFields((ingredientFields) => ingredientFields.filter((ingredientField) => ingredientField.key !== id));
    dispatch(deleteIngredient({ id: id.toString() }));
  };

  const onAddStepField = useCallback(() => {
    const stepId = Random.id();

    setStepFields((stepFields) => [
      ...stepFields,
      <Field key={stepId} name={`steps:${stepId}`} reducerName="recipes" type="textarea" />,
    ]);
  }, []);

  const onDeleteStepField = (id: Key | null) => {
    if (!id) return;

    setStepFields((stepFields) => stepFields.filter((stepField) => stepField.key !== id));
    dispatch(deleteStep({ id: id.toString() }));
  };

  useEffect(() => {
    if (firstRender.current) {
      if (!ingredientFields.length) onAddIngredientField();
      if (!stepFields.length) onAddStepField();
      firstRender.current = false;
    }
  }, [onAddIngredientField, ingredientFields.length, onAddStepField, stepFields.length]);

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
              label="Nom de la recette"
              name="name"
              reducerName="recipes"
              type="text"
              error={nameAlreadyTaken ? 'Une recette avec ce nom existe déjà.' : ''}
            />
            <Field label="Description" name="description" reducerName="recipes" type="textarea" />
            <div className={classes['info-grid']}>
              <Field
                classNames={{
                  container: classes.prep_container,
                }}
                label="Préparation"
                name="preparationTime"
                reducerName="recipes"
                type="number"
              />
              <Field
                classNames={{
                  container: classes.cook_container,
                }}
                label="Cuisson"
                name="cookingTime"
                reducerName="recipes"
                type="number"
              />
              <Field
                classNames={{
                  container: classes.rest_container,
                }}
                label="Repos"
                name="restTime"
                reducerName="recipes"
                type="number"
              />
              <Field
                classNames={{
                  container: classes.cost_container,
                  field: classes.cost_field,
                }}
                label="Coût"
                name="cost"
                reducerName="recipes"
                type="number"
              />
              <Field
                classNames={{
                  container: classes.people_container,
                }}
                label="Personnes"
                name="forHowMany"
                reducerName="recipes"
                type="number"
              />
              <Field
                classNames={{
                  container: classes.difficulty_container,
                  field: classes.difficulty_field,
                }}
                label="Difficulté"
                name="difficulty"
                reducerName="recipes"
                type="difficulty"
              />
            </div>
          </fieldset>
          <hr />
          {/* <fieldset>
            <legend>
              Ingrédients
              <button
                title="Ajouter un ingrédient"
                className={`${classes.add_button} diet-before-plus`}
                onClick={onAddIngredientField}
              />
            </legend>

            {ingredientFields.map((ingredientField) => (
              <div key={ingredientField.key} className={classes.added_ingredients}>
                {ingredientField}
                {ingredientFields.length > 1 ? (
                  <button
                    title="Supprimer ingrédient"
                    className={`${classes.trash_button} diet-before-trash`}
                    onClick={() => onDeleteIngredientField(ingredientField.key)}
                  />
                ) : null}
              </div>
            ))}
          </fieldset>
          <hr /> */}
          {/* <fieldset className={classes.macros}>
            <legend>Macros</legend>
            <Field label="Calories" name="calories" reducerName="recipes" type="number" />
            <Field label="Protéines" name="protein" reducerName="recipes" type="number" />
            <Field label="Lipides" name="fat" reducerName="recipes" type="number" />
            <Field label="Lipides saturés" name="saturated" reducerName="recipes" type="number" />
            <Field label="Glucides" name="carbs" reducerName="recipes" type="number" />
            <Field label="Sucres" name="sugar" reducerName="recipes" type="number" />
          </fieldset>
          <hr /> */}
          <fieldset className={classes.steps}>
            <legend>
              Etapes
              <button
                title=" Ajouter une étape"
                className={`${classes.add_button} diet-before-plus`}
                onClick={onAddStepField}
              />
            </legend>
            {stepFields.map((stepField) => (
              <div className={`${classes.step} ${classes.added_step} step-count`} key={stepField.key}>
                {stepField}
                {stepFields.length > 1 ? (
                  <button
                    title="Supprimer étape"
                    className={`${classes.trash_button} diet-before-trash`}
                    onClick={() => onDeleteStepField(stepField.key)}
                  />
                ) : null}
              </div>
            ))}
          </fieldset>
          <hr />
          <fieldset>
            <legend>Photos</legend>
            <Field label="Miniature" name="thumbnail" reducerName="recipes" type="file" />
            <Field label="Photos supplémentaires" name="photos" reducerName="recipes" type="file" multiple />
          </fieldset>
          <button className={classes.button}>Ajouter</button>
        </form>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const recipes = await prisma.recipe.findMany({
    select: {
      name: true,
    },
  });

  return {
    props: {
      takenRecipeNames: recipes.map((r) => r.name.toLowerCase()),
      products,
    },
  };
};

export default RecipesPage;
