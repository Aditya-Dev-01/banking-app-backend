import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/account.routes";
import { errorHandler } from "./utils/errorHandler";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/account", accountRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});