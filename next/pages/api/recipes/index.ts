import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // check for post request
  if (req.method === 'POST') {
    // do something
    return;
  } else if (req.method === 'GET') {
    let { limit = 0, page = 1 } = req.query;

    if (!limit) {
      return res.status(400).json({ message: 'Limit is required' });
    }

    // make sure limit and page are numbers
    limit = +limit;
    page = +page;

    // check if limit is a number
    if (isNaN(limit)) {
      return res.status(400).json({ message: 'Limit must be a number' });
    }

    // check if page is a number
    if (isNaN(page)) {
      return res.status(400).json({ message: 'Page must be a number' });
    }

    // check if limit is greater than 0
    if (limit <= 0) {
      return res.status(400).json({ message: 'Limit must be greater than 0' });
    }

    // check if page is greater than 0
    if (page <= 0) {
      return res.status(400).json({ message: 'Page must be greater than 0' });
    }

    // pagination
    const skip = (page - 1) * limit;

    // get recipes from psql
    // const recipes = await prisma.recipe.findMany({
    //   take: limit,
    //   skip,
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });

    // return recipes
    // return res.status(200).json(recipes);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
