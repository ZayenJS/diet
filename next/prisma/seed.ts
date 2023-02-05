import { Difficulty, Unit, PrismaClient, Gender, Role, ActivityLevel } from '@prisma/client';
import faker from 'faker';
import slugify from 'slugify';

class Seed {
  private static prisma = new PrismaClient();

  private static products = [
    'Pomme',
    'Poire',
    'Banane',
    'Orange',
    'Citron',
    'Pêche',
    'Abricot',
    'Fraise',
    'Mûre',
    'Myrtille',
    'Cerise',
    'Tomate',
    'Poivron',
    'Courgette',
    'Aubergine',
    'Carotte',
    'Oignon',
    'Sucre',
    'Farine',
    'Lait',
    'Oeuf',
    'Beurre',
    'Huile',
    'Sel',
    'Poivre',
    'Piment',
    'Paprika',
    'Cumin',
    'Curcuma',
    'Gingembre',
    'Pain',
    'Pâtes',
    'Riz',
    'Poisson',
    'Viande',
    'Légumes',
    'Fruits',
    'Fromage',
    'Yaourt',
    'Crème',
    'Chocolat',
    'Biscuits à la cuillère',
    'Chocolat au lait',
    'Chocolat noir',
    'Chocolat blanc',
  ];

  private static tools = [
    'Couteau',
    'Fourchette',
    'Cuillère',
    'Casserole',
    'Poêle',
    'Casserole à fond épais',
    'Casserole à fond mince',
    'Poêle à fond épais',
    'Poêle à fond mince',
    'Couteau à pain',
    'Couteau à légumes',
    'Couteau à viande',
    'Batteur',
    'Moule à gâteau',
    'Moule à tarte',
    'Moule à muffins',
    'Moule à cake',
    'Moule à pain',
  ];

  private static categories = ['Entrée', 'Plat', 'Dessert', 'Boisson', 'Apéritif', 'Sauce'];
  private static tags = [
    'Végétarien',
    'Vegan',
    'Sans gluten',
    'Sans lactose',
    'Sans oeuf',
    'Sans sucre',
    'Sans sel',
    'Sans poivre',
    'Noël',
    'Pâques',
    'Fête des mères',
    'Fête des pères',
    'Saint-Valentin',
    "Jour de l'an",
    'Anniversaire',
    'Bio',
    'Sain',
    'Rapide',
    'Facile',
    'Bon marché',
    'Économique',
    'Équilibré',
    'Épicé',
    'Sucré',
  ];

  private static numberOfSteps = faker.datatype.number({ min: 60, max: 120 });
  private static numberOfRecipes = faker.datatype.number({ min: 10, max: 30 });
  private static numberOfRecipeRates = faker.datatype.number({ min: 100, max: 200 });
  private static numberOfIngredients = faker.datatype.number({ min: 50, max: 100 });
  private static numberOfRecipeImages = faker.datatype.number({ min: 10, max: 50 });

  static async run() {
    await this.seedDatabase();
  }

  private static async seedDatabase() {
    await this.deleteData();
    await this.restartSequences();
    await this.seedUsers();
    await this.seedCategories();
    await this.seedProducts();
    await this.seedSteps();
    await this.seedTags();
    await this.seedTools();
    await this.seedRecipes();
    await this.seedRecipeRates();
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
    await this.prisma.recipeRating.deleteMany({});
    await this.prisma.recipeImage.deleteMany({});
    await this.prisma.recipe.deleteMany({});
    await this.prisma.category.deleteMany({});
    await this.prisma.user.deleteMany({});
    console.log('Deleted all data');
  }

  private static async restartSequences() {
    console.log('Restarting all sequences');
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."steps_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."tags_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."tools_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."ingredients_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."products_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."recipe_ratings_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."recipe_images_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."recipes_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."categories_id_seq" RESTART WITH 1;`;
    await this.prisma.$executeRaw`ALTER SEQUENCE "public"."users_id_seq" RESTART WITH 1;`;
    console.log('Restarted all sequences');
  }

  private static async seedUsers() {
    await this.prisma.user.create({
      data: {
        email: faker.internet.email(),
        auth_token: '_',
        gender: Gender.MALE,
        role: Role.ADMIN,
        activityLevel: ActivityLevel.ACTIVE,
        birth_date: new Date('1988-06-16'),
        height: 176,
        weight: 84,
        first_name: 'Test',
        last_name: 'Tester',
      },
    });
    console.log('Created admin user');
  }

  private static async seedCategories() {
    for (const category of this.categories) {
      const name = category;
      const slug = slugify(name, { lower: true, strict: true });

      await this.prisma.category.create({
        data: {
          name: category,
          slug,
          color: faker.internet.color(),
        },
      });
    }
    console.log('Created categories');
  }

  private static async seedProducts() {
    for (const product of this.products) {
      const name = product;
      const slug = slugify(name, { lower: true, strict: true });

      await this.prisma.product.create({
        data: {
          name,
          slug,
          image: faker.random.image(),
          calories: faker.datatype.number(500),
          carbs: faker.datatype.number(30),
          fat: faker.datatype.number(30),
          sugar: faker.datatype.number(30),
          protein: faker.datatype.number(30),
          saturated: faker.datatype.number(30),
          fiber: faker.datatype.number(10),
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
    for (const tag of this.tags) {
      const name = tag;
      const slug = slugify(name, { lower: true, strict: true });

      await this.prisma.tag.create({
        data: {
          name,
          slug,
          color: faker.internet.color(),
        },
      });
    }
    console.log('Created tags');
  }

  private static async seedTools() {
    for (const tool of this.tools) {
      await this.prisma.tool.create({
        data: {
          name: tool,
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

      const category = faker.random.arrayElement(await this.prisma.category.findMany());

      const name = `${faker.lorem.sentence(faker.datatype.number(10))}_${faker.datatype.number({ min: 1, max: 5 })}`;
      const slug = slugify(name, { lower: true, strict: true });

      await this.prisma.recipe.create({
        data: {
          name,
          slug,
          description: faker.lorem.sentence(),
          cookingTime: faker.datatype.number(60),
          cost: faker.datatype.number(100),
          difficulty: faker.random.arrayElement(Object.values(Difficulty)),
          forHowMany: faker.datatype.number({ min: 2 }),
          preparationTime: faker.datatype.number(35),
          restTime: faker.datatype.number(15),
          thumbnailUrl: faker.random.image(),
          creatorId: 1,
          tags: {
            connect: tags,
          },
          tools: {
            connect: tools,
          },
          steps: {
            connect: steps,
          },
          categoryId: category.id,
        },
      });
    }
    console.log('Created recipes');
  }

  private static async seedRecipeRates() {
    for (let i = 1; i <= this.numberOfRecipeRates; i++) {
      let randomRecipe = null;

      while (!randomRecipe) {
        const id = faker.datatype.number({ min: 1, max: this.numberOfRecipes });
        randomRecipe = await this.prisma.recipe.findUnique({ where: { id } });
      }

      await this.prisma.recipeRating.create({
        data: {
          recipe: {
            connect: {
              id: randomRecipe.id,
            },
          },
          rating: faker.datatype.number({ min: 1, max: 5 }),
          user: {
            connect: {
              id: 1,
            },
          },
        },
      });
    }
    console.log('Created recipe rates');
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
