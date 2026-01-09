// src/http/server.ts
import express from "express";
import { reportRoutes } from "./routes/report.routes";

const app = express();

app.use(express.json());
app.use(reportRoutes);

export { app };
