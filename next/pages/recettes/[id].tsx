import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import Layout from '../../components/Layout/Layout';
import Recipe from '../../components/Recipe/Recipe';
import { APP_NAME } from '../../constants';

interface Props extends FullRecipe {}

const RecipePage: FC<Props> = (recipe) => {
  return (
    <>
      <Head>
        <title>
          {APP_NAME} | {recipe.name}
        </title>
      </Head>
      <Layout>
        <Recipe recipe={recipe} detailed />
      </Layout>
    </>
  );
};

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: +id,
    },
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
  });

  if (!recipe) return { notFound: true };

  return {
    props: { ...JSON.parse(JSON.stringify(recipe)) },
  };
};

export default RecipePage;
