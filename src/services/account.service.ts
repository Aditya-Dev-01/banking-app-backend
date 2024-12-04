import prisma from "../prisma/prisma";

export const deposit = async (iban: string, amount: number) => {
  const account = await prisma.account.findUnique({ where: { iban } });
  if (!account) throw new Error("Account not found.");

  const newBalance = account.balance + amount;

  await prisma.account.update({
    where: { iban },
    data: {
      balance: newBalance,
      statements: {
        create: { amount, balance: newBalance },
      },
    },
  });

  return newBalance;
};

export const withdraw = async (iban: string, amount: number) => {
  const account = await prisma.account.findUnique({ where: { iban } });
  if (!account) throw new Error("Account not found.");

  if (account.balance < amount) throw new Error("Insufficient balance.");

  const newBalance = account.balance - amount;

  await prisma.account.update({
    where: { iban },
    data: {
      balance: newBalance,
      statements: {
        create: { amount: -amount, balance: newBalance },
      },
    },
  });

  return newBalance;
};

export const transfer = async (fromIban: string, toIban: string, amount: number) => {
  const sender = await prisma.account.findUnique({ where: { iban: fromIban } });
  const receiver = await prisma.account.findUnique({ where: { iban: toIban } });

  if (!sender || !receiver) throw new Error("Invalid IBAN.");

  if (sender.balance < amount) throw new Error("Insufficient balance.");

  const senderNewBalance = sender.balance - amount;
  const receiverNewBalance = receiver.balance + amount;

  await prisma.$transaction([
    prisma.account.update({
      where: { iban: fromIban },
      data: {
        balance: senderNewBalance,
        statements: {
          create: { amount: -amount, balance: senderNewBalance },
        },
      },
    }),
    prisma.account.update({
      where: { iban: toIban },
      data: {
        balance: receiverNewBalance,
        statements: {
          create: { amount, balance: receiverNewBalance },
        },
      },
    }),
  ]);
};

export const getStatements = async (iban: string) => {
  const account = await prisma.account.findUnique({
    where: { iban },
    include: { statements: { orderBy: { date: "desc" } } },
  });

  if (!account) throw new Error("Account not found.");

  return account.statements;
};
