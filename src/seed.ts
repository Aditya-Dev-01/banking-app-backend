import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const account1 = await prisma.account.create({
    data: {
      iban: 'DE89370400440532013000',
      balance: 0.0,
    },
  });

  const account2 = await prisma.account.create({
    data: {
      iban: 'DE89370400440532013001',
      balance: 0.0,
    },
  });

  console.log({ account1, account2 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});