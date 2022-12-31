import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // check for post request
  if (req.method === 'POST') {
    // do something
    return;
  } else if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Id is required' });
    }

    return res.status(200).json({});
  }

  res.status(405).json({ message: 'Method not allowed' });
}
