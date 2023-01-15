import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

import { Product } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    return res.send(products);
  }

  if (req.method === 'POST') {
    const { name, calories, protein, fat, saturated, carbs, sugar, fiber } = req.body as unknown as Product;

    const missingFields: string[] = [
      'name',
      'calories',
      'protein',
      'fat',
      'saturated',
      'carbs',
      'sugar',
      'fiber',
    ].filter((field) => !req.body[field]);

    if (missingFields.length) {
      return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    const product = await prisma.product.create({
      data: {
        name,
        calories: Number(calories),
        protein: Number(protein),
        fat: Number(fat),
        saturated: Number(saturated),
        carbs: Number(carbs),
        sugar: Number(sugar),
        fiber: Number(fiber),
      },
    });

    return res.send({
      product,
      message: 'Produit ajouté avec succès.',
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body as unknown as Product;

    const missingFields: string[] = ['id'].filter((field) => !req.body[field]);

    if (missingFields.length) {
      return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    return res.send({
      product,
      message: "Suppression de l'aliment réussie.",
    });
  }
}
