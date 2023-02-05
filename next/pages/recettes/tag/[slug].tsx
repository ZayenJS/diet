import { FC } from 'react';
import { FullRecipe } from '../../../@types/types/FullRecipe';
import Layout from '../../../components/Layout/Layout';
import { prisma } from '../../../lib/prisma';

import classes from '../../../assets/scss/pages/recipes.module.scss';
import { NextApiRequest } from 'next';
import { Prisma, Tag } from '@prisma/client';
import Pagination from '../../../components/Pagination/Pagination';
import Recipe from '../../../components/Recipe/Recipe';
import Head from 'next/head';
import { APP_NAME } from '../../../constants';
import { Config } from '../../../config';

interface Props {
  recipes: FullRecipe[];
  page: number;
  pages: number;
  perPage: number;
  tag: Partial<Tag>;
}

const RecipesPage: FC<Props> = ({ recipes, page, pages, tag }) => {
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
          {APP_NAME} | Recettes{tag.name ? `: ${tag.name}` : ''} (page {page})
        </title>
      </Head>
      <Layout>
        <div className={classes.recipes}>
          <div className={classes.container}>{content}</div>
          {!!recipesMap.length && (
            <Pagination page={Number(page)} pages={pages} path={`/recettes/tag/${tag.slug}`} goToExtremity />
          )}
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

  const recipeWhere = {
    tags: {
      some: {
        id: Number(req.query.id),
      },
    },
  };

  const params: {
    include: Prisma.RecipeInclude;
    skip?: number;
    take?: number;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
    where?: Prisma.RecipeWhereInput;
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
      category: true,
    },
    skip,
    take,
    where: recipeWhere,
  };

  if (sort && direction) {
    params['orderBy'] = {
      [sort as string]: direction,
    };
  }
  const recipes = await prisma.recipe.findMany(params);
  const tag = await prisma.tag.findUnique({
    where: {
      id: Number(req.query.id),
    },
    select: {
      id: true,
      name: true,
    },
  });

  const totalRecipes = await prisma.recipe.count({ where: recipeWhere });
  const pages = Math.ceil(totalRecipes / Number(perPage));

  if (!recipes.length) {
    return {
      props: { recipes: [], page, perPage, pages, tag },
    };
  }

  return {
    props: { recipes: JSON.parse(JSON.stringify(recipes)), page, perPage, pages, tag },
  };
};

export default RecipesPage;
