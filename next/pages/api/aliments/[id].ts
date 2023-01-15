import { Product } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: `Missing fields: id` });
    }

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body as unknown as Product,
    });

    return res.send({
      product,
      message: 'Produit bien mis à jour.',
    });
  }
}
