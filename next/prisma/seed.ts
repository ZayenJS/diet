import { DifficultyEnum, Unit, PrismaClient } from '@prisma/client';
import faker from 'faker';

class Seed {
  private static prisma = new PrismaClient();

  private static numberOfProducts = faker.datatype.number({ min: 50, max: 100 });
  private static numberOfSteps = faker.datatype.number({ min: 60, max: 120 });
  private static numberOfTags = faker.datatype.number({ min: 10, max: 20 });
  private static numberOfTools = faker.datatype.number({ min: 5, max: 20 });
  private static numberOfRecipes = faker.datatype.number({ min: 10, max: 30 });
  private static numberOfIngredients = faker.datatype.number({ min: 50, max: 100 });
  private static numberOfRecipeImages = faker.datatype.number({ min: 10, max: 50 });

  static async run() {
    await this.seedDatabase();
  }

  private static async seedDatabase() {
    await this.deleteData();
    await this.restartSequences();
    await this.seedProducts();
    await this.seedSteps();
    await this.seedTags();
    await this.seedTools();
    await this.seedRecipes();
    await this.seedIngredients();
    await this.seedRecipeImages();
  }

  private static async deleteData() {
    console.log('Deleting all data');
    await this.prisma.step.deleteMany({});
    await this.prisma.tag.deleteMany({});
    await this.prisma.tool.deleteMany({});
    await this.prisma.ingredient.deleteMany({});
    await this.prisma.product.deleteMany({});
    await this.prisma.recipeImage.deleteMany({});
    await this.prisma.recipe.deleteMany({});
    console.log('Deleted all data');
  }

  private static async restartSequences() {
    console.log('Restarting all sequences');
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."steps_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."tags_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."tools_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."ingredients_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."products_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."recipe_images_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."recipes_id_seq" RESTART WITH 1;`;
    console.log('Restarted all sequences');
  }

  private static async seedProducts() {
    for (let i = 1; i <= this.numberOfProducts; i++) {
      await this.prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          images: faker.random.image(),
        },
      });
    }
    console.log('Created products');
  }

  private static async seedSteps() {
    for (let i = 1; i <= this.numberOfSteps; i++) {
      await this.prisma.step.create({
        data: {
          text: faker.lorem.sentence(),
        },
      });
    }
    console.log('Created steps');
  }

  private static async seedTags() {
    for (let i = 1; i <= this.numberOfTags; i++) {
      await this.prisma.tag.create({
        data: {
          name: faker.lorem.word(),
        },
      });
    }
    console.log('Created tags');
  }

  private static async seedTools() {
    for (let i = 1; i <= this.numberOfTools; i++) {
      await this.prisma.tool.create({
        data: {
          name: faker.lorem.word(),
        },
      });
    }
    console.log('Created tools');
  }

  private static async seedRecipes() {
    for (let i = 1; i <= this.numberOfRecipes; i++) {
      const tags = (
        await this.prisma.tag.findMany({
          take: faker.datatype.number({ min: 3, max: 7 }),
        })
      ).map((tag) => ({ id: tag.id }));

      const tools = (
        await this.prisma.tool.findMany({
          take: faker.datatype.number({ min: 3, max: 7 }),
        })
      ).map((tool) => ({ id: tool.id }));

      const steps = (
        await this.prisma.step.findMany({
          take: faker.datatype.number({ min: 3, max: 7 }),
        })
      ).map((step) => ({ id: step.id }));

      await this.prisma.recipe.create({
        data: {
          name: `${faker.lorem.sentence(faker.datatype.number(10))}_${faker.datatype.number({ min: 1, max: 5 })}`,
          description: faker.lorem.sentence(),
          cookingTime: faker.datatype.number(60),
          cost: faker.datatype.number(100),
          difficulty: faker.random.arrayElement(Object.values(DifficultyEnum)),
          forHowMany: faker.datatype.number(8),
          preparationTime: faker.datatype.number(35),
          rating: faker.datatype.number(5),
          restTime: faker.datatype.number(15),
          thumbnailUrl: faker.random.image(),
          calories: faker.datatype.number(500),
          carbs: faker.datatype.number(30),
          fat: faker.datatype.number(30),
          sugar: faker.datatype.number(30),
          protein: faker.datatype.number(30),
          saturated: faker.datatype.number(30),
          tags: {
            connect: tags,
          },
          tools: {
            connect: tools,
          },
          steps: {
            connect: steps,
          },
        },
      });
    }
    console.log('Created recipes');
  }

  private static async seedIngredients() {
    for (let i = 1; i <= this.numberOfIngredients; i++) {
      let randomProduct = null;

      while (!randomProduct) {
        const id = faker.datatype.number({ min: 1, max: this.numberOfRecipes });
        randomProduct = await this.prisma.product.findUnique({ where: { id } });
      }

      let randomRecipe = null;

      while (!randomRecipe) {
        const id = faker.datatype.number({ min: 1, max: this.numberOfRecipes });
        randomRecipe = await this.prisma.recipe.findUnique({ where: { id } });
      }

      await this.prisma.ingredient.create({
        data: {
          productId: randomProduct.id,
          recipeId: randomRecipe.id,
          amount: faker.datatype.number({ min: 1, max: 29 }),
          unit: faker.random.arrayElement(Object.values(Unit)),
        },
      });
    }
    console.log('Created ingredients');
  }

  private static async seedRecipeImages() {
    for (let i = 1; i <= this.numberOfRecipeImages; i++) {
      let randomRecipe = null;

      while (!randomRecipe) {
        const id = faker.datatype.number({ min: 1, max: this.numberOfRecipes });
        randomRecipe = await this.prisma.recipe.findUnique({ where: { id } });
      }

      await this.prisma.recipeImage.create({
        data: {
          recipeId: randomRecipe.id,
          url: faker.random.image(),
        },
      });
    }
    console.log('Created recipe images');
  }
}

Seed.run();
