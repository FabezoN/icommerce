import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import productsJson from "../domains/catalog/data/products.json";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();

  for (const p of productsJson) {
    await prisma.product.create({
      data: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        currency: p.currency,
        stock: p.stock,
        sku: p.sku,
        category: p.category,
        brand: p.brand,
        images: p.images,
        specs: p.specs,
      },
    });
  }

  console.log(`Seed OK : ${productsJson.length} produits insérés.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
