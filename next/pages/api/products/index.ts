import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import fsp from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};
import formidable, { Part } from 'formidable';
import { Product } from '@prisma/client';

export default async function handler(req: NextApiRequest & { files: formidable.Files }, res: NextApiResponse) {
  let uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
  try {
    await fsp.access(uploadDir);
  } catch (err) {
    await fsp.mkdir(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    allowEmptyFiles: false,
    multiples: false,
  });

  const fileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  form.onPart = (part: Part) => {
    if (fileTypes.indexOf(part.mimetype as string) === -1) {
      // Here is the invalid file types will be handled.
      // You can listen on 'error' event
      // @ts-expect-error
      form._error(new Error('File type is not supported'));
    }
    if (part.originalFilename === '' || !part.mimetype) {
      // used internally, please do not override!
      form._handlePart(part);
    }
  };

  form.parse(req, async function (err, fields, files) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { name, calories, protein, fat, saturated, carbs, sugar, fiber } = fields as unknown as Product;
    let imageSaved = false;

    const missingFields: string[] = [
      'name',
      'calories',
      'protein',
      'fat',
      'saturated',
      'carbs',
      'sugar',
      'fiber',
    ].filter((field) => !fields[field]);

    if (missingFields.length) {
      return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
    }

    const imageName = (files.image as unknown as formidable.File)?.newFilename;

    if (imageName) {
      uploadDir = `${uploadDir.replace('/app/public', '')}/${imageName}`;
      imageSaved = true;
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
        image: imageSaved ? uploadDir : null,
      },
    });

    return res.send({
      product,
    });
  });
}
