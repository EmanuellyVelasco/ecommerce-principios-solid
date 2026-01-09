// src/http/routes/report.routes.ts
import { Router } from "express";
import { ReportController } from "../controllers/ReportController";

const reportRoutes = Router();

reportRoutes.get(
  "/relatorio/:n",
  ReportController.handle
);

export { reportRoutes };
