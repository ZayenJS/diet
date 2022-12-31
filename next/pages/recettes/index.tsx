import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import Layout from '../../components/Layout/Layout';
import Recipe from '../../components/Recipe/Recipe';
import { prisma } from '../../lib/prisma';

import classes from '../../assets/scss/pages/recipes.module.scss';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

interface Props {
  recipes: FullRecipe[];
  page: number;
  pages: number;
  perPage: number;
}

const RecipesPage: FC<Props> = ({ recipes, page, perPage, pages }) => {
  const recipesMap = recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
  const noRecipes = <p>Aucune recette n&apos;a été trouvée</p>;
  const content = recipes.length > 0 ? recipesMap : noRecipes;

  const pagesButtons = [];

  for (let i = 1; i <= pages; i++) {
    pagesButtons.push(<Link href={`/recettes?page=${i}&per-page=${perPage}`}>{i}</Link>);
  }

  return (
    <Layout>
      <div className={classes.container}>{content}</div>
      <div className="pagination">
        {page > 1 && <Link href={`/recettes?page=${Number(page) - 1}&per-page=${perPage}`}>Précédent</Link>}
        {pagesButtons}
        {page < pages && <Link href={`/recettes?page=${Number(page) + 1}&per-page=${perPage}`}>Suivant</Link>}
        <p>
          Page {page} sur {pages}
        </p>
        <p>
          {recipes.length} recettes sur {recipes.length * pages}
        </p>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const { page = 1, sort, direction } = req.query;
  const perPage = req.query['per-page'] ?? 10;

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
