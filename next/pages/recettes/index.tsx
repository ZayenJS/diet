import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import Layout from '../../components/Layout/Layout';
import Recipe from '../../components/Recipe/Recipe';
import { prisma } from '../../lib/prisma';

import classes from '../../assets/scss/pages/recipes.module.scss';
import { NextApiRequest } from 'next';
import { Prisma } from '@prisma/client';
import Pagination from '../../components/Pagination/Pagination';
import Head from 'next/head';
import { APP_NAME } from '../../constants';
import { Config } from '../../config';

interface Props {
  recipes: FullRecipe[];
  page: number;
  pages: number;
  perPage: number;
}

const RecipesPage: FC<Props> = ({ recipes, page, pages }) => {
  let recipesMap: JSX.Element[] = [];

  if (recipes.length) {
    recipesMap = recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} showMoreTags />);
  }

  const noRecipes = <p>Aucune recette n&apos;a été trouvée</p>;
  const content = recipesMap.length ? recipesMap : noRecipes;

  return (
    <>
      <Head>
        <title>
          {APP_NAME} | Recettes (page {page})
        </title>
      </Head>
      <Layout>
        <div className={classes.recipes}>
          <div className={classes.container}>{content}</div>
          {!!recipesMap.length && <Pagination page={Number(page)} pages={pages} path="/recettes" goToExtremity />}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const { page = 1, sort, direction } = req.query;
  const perPage = req.query['per-page'] ?? req.query['perPage'] ?? Config.RECIPES_PER_PAGE;

  const skip = (Number(page) - 1) * Number(perPage);
  const take = Number(perPage);

  const params: {
    include: Prisma.RecipeInclude;
    skip?: number;
    take?: number;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
  } = {
    include: {
      ingredients: {
        include: {
          product: true,
        },
      },
      steps: true,
      images: true,
      tags: true,
      tools: true,
    },
    skip,
    take,
  };

  if (sort && direction) {
    params['orderBy'] = {
      [sort as string]: direction,
    };
  }

  const recipes = await prisma.recipe.findMany(params);
  const totalRecipes = await prisma.recipe.count();
  const pages = Math.ceil(totalRecipes / Number(perPage));

  return {
    props: { recipes: JSON.parse(JSON.stringify(recipes)), page, perPage, pages },
  };
};

export default RecipesPage;
