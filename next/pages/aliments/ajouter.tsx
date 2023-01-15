import { FC, useRef } from 'react';
import Layout from '../../components/Layout/Layout';

import Head from 'next/head';
import { APP_NAME } from '../../constants';
import Field from '../../components/Field/Field';
import { useSelector } from 'react-redux';
import { State, useAppDispatch } from '../../store';
import { prisma } from '../../lib/prisma';

import classes from '../../assets/scss/pages/add-recipe.module.scss';
import { createProduct } from '../../store/actions/products';

interface Props {
  takenProductsNames: string[];
}

const RecipesPage: FC<Props> = ({ takenProductsNames = [] }) => {
  const firstRender = useRef(true);

  const dispatch = useAppDispatch();

  const productName = useSelector((state: State) => state.products.create.name);
  const isLoading = useSelector((state: State) => state.products.loading);

  const nameAlreadyTaken = takenProductsNames.includes(productName);

  const createProductData = useSelector((s: State) => s.products.create);
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(createProduct({ data: createProductData }));
  };

  return (
    <>
      <Head>
        <title>{APP_NAME} | Ajouter un aliment</title>
      </Head>
      <Layout>
        <form onSubmit={onSubmitHandler} className={classes.container}>
          <fieldset className={classes.general}>
            <legend>Informations générales</legend>
            <Field
              label="Nom de l'aliment"
              name="name"
              reducerName="products"
              type="text"
              error={nameAlreadyTaken ? 'Un aliment avec ce nom existe déjà.' : ''}
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
            <legend>Image</legend>
            <Field label="Choisissez une image" name="image" reducerName="products" type="file" withPreview />
          </fieldset>
          <button className={classes.button}>{isLoading ? 'Chargement' : 'Ajouter'}</button>
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

  return {
    props: {
      takenProductsNames: products.map((r) => r.name.toLowerCase()),
    },
  };
};

export default RecipesPage;
