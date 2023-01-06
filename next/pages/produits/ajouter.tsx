import { FC, useRef } from 'react';
import Layout from '../../components/Layout/Layout';

import Head from 'next/head';
import { APP_NAME } from '../../constants';
import Field from '../../components/Field/Field';
import { useSelector } from 'react-redux';
import { State, useAppDispatch } from '../../store/';
import { prisma } from '../../lib/prisma';

import classes from '../../assets/scss/pages/add-recipe.module.scss';
import { Product } from '@prisma/client';
import { createProduct } from '../../store/actions/products';

interface Props {
  takenRecipeNames: string[];
  products: Partial<Product>[];
}

const RecipesPage: FC<Props> = ({ takenRecipeNames = [], products }) => {
  const firstRender = useRef(true);

  const dispatch = useAppDispatch();

  const recipeName = useSelector((state: State) => state.recipes.name);

  const nameAlreadyTaken = takenRecipeNames.includes(recipeName);

  const createProductData = useSelector((s: State) => s.products.create);
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    dispatch(
      createProduct({
        data: createProductData,
      }),
    );
  };

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
              label="Nom du produit"
              name="name"
              reducerName="products"
              type="text"
              error={nameAlreadyTaken ? 'Un produit avec ce nom existe déjà.' : ''}
            />
          </fieldset>
          <hr />
          <fieldset className={classes.macros}>
            <legend>Macros</legend>
            <Field label="Calories" name="calories" reducerName="products" type="number" />
            <Field label="Protéines" name="protein" reducerName="products" type="number" />
            <Field label="Lipides" name="fat" reducerName="products" type="number" />
            <Field label="Lipides saturés" name="saturated" reducerName="products" type="number" />
            <Field label="Glucides" name="carbs" reducerName="products" type="number" />
            <Field label="Sucres" name="sugar" reducerName="products" type="number" />
            <Field label="Fibres" name="fiber" reducerName="products" type="number" />
          </fieldset>
          <hr />

          <fieldset>
            <legend>Photos</legend>
            <Field label="Image" name="image" reducerName="products" type="file" />
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
