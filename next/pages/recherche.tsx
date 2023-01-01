import { Recipe, Tool, Product, Tag } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { IngredientWithProduct } from '../@types/types/IngredientWithProduct';
import Layout from '../components/Layout/Layout';
import { APP_NAME } from '../constants';

interface Props {
  searchResult: {
    recipes: Recipe[];
    ingredients: IngredientWithProduct[];
    tools: Tool[];
    tags: Tag[];
    products: Product[];
  };
}

const SearchPage: FC<Props> = ({ searchResult }) => {
  const { recipes, ingredients, tools, tags, products } = searchResult;

  let recipeResults = null;
  if (recipes.length) {
    recipeResults = recipes.map((recipe) => <p key={recipe.id}>{recipe.name}</p>);
  }

  let ingredientResults = null;
  if (ingredients.length) {
    ingredientResults = ingredients.map((ingredient) => <p key={ingredient.id}>{ingredient.product.name}</p>);
  }

  let toolResults = null;
  if (tools.length) {
    toolResults = tools.map((tool) => <p key={tool.id}>{tool.name}</p>);
  }

  let tagResults = null;
  if (tags.length) {
    tagResults = tags.map((tag) => <p key={tag.id}>{tag.name}</p>);
  }

  let productResults = null;
  if (products.length) {
    productResults = products.map((product) => <p key={product.id}>{product.name}</p>);
  }

  return (
    <>
      <Head>
        <title>{APP_NAME} | Résultats de recherche</title>
      </Head>
      <Layout>
        <div>
          <h1>Recherche</h1>
          {recipeResults && (
            <>
              <h2>Recettes</h2>
              {recipeResults}
            </>
          )}
          {ingredientResults && (
            <>
              <h2>Ingrédients</h2>
              {ingredientResults}
            </>
          )}
          {toolResults && (
            <>
              <h2>Ustensiles</h2>
              {toolResults}
            </>
          )}
          {tagResults && (
            <>
              <h2>Tags</h2>
              {tagResults}
            </>
          )}
          {productResults && (
            <>
              <h2>Produits</h2>
              {productResults}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
  return {
    props: {
      searchResult: {
        recipes: [],
        ingredients: [],
        tools: [],
        tags: [],
        products: [],
      },
    },
  };
};

export default SearchPage;
