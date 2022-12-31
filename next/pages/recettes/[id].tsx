import { NextApiRequest, NextApiResponse } from 'next';
import { FC } from 'react';
import { FullRecipe } from '../../@types/types/FullRecipe';
import Recipe from '../../components/Recipe/Recipe';

interface Props extends FullRecipe {}

const RecipePage: FC<Props> = (recipe) => {
  return <Recipe recipe={recipe} detailed />;
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
