// src/main.ts
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

import { container } from "./infra/container";
import { app } from "./http/server";

const PORT = Number(process.env.APP_PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Servidor HTTP funcionando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.APP_ENV}`);
});
