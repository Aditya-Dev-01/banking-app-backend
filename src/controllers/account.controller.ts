import { Request, Response } from "express";
import * as accountService from "../services/account.service";

export const deposit = async (req: Request, res: Response) => {
  try {
    const { iban, amount } = req.body;
    const newBalance = await accountService.deposit(iban, amount);
    res.status(200).json({ balance: newBalance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  try {
    const { iban, amount } = req.body;
    const newBalance = await accountService.withdraw(iban, amount);
    res.status(200).json({ balance: newBalance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const { fromIban, toIban, amount } = req.body;
    await accountService.transfer(fromIban, toIban, amount);
    res.status(200).json({ message: "Transfer successful" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getStatements = async (req: Request, res: Response) => {
  try {
    const { iban } = req.params;
    const statements = await accountService.getStatements(iban);
    res.status(200).json(statements);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
