import { Router } from "express";
import * as accountController from "../controllers/account.controller";

const router = Router();

router.post("/deposit", accountController.deposit);
router.post("/withdraw", accountController.withdraw);
router.post("/transfer", accountController.transfer);
router.get("/statements/:iban", accountController.getStatements);

export default router;
