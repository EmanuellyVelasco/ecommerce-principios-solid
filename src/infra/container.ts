// src/infra/container.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

import { ILogger } from "../domain/interfaces/ILogger";
import { IMailer } from "../domain/interfaces/IMailer";
import { IReportService } from "../domain/interfaces/IReportService";

import { LoggerAdapter } from "../lib/adapters/LoggerAdapter";
import { MailerAdapter } from "../lib/adapters/MailerAdapter";
import { ReportService } from "../services/ReportService";

const container = new Container();

container
  .bind<ILogger>(TYPES.ILogger)
  .to(LoggerAdapter)
  .inSingletonScope();

container
  .bind<IMailer>(TYPES.IMailer)
  .to(MailerAdapter)
  .inSingletonScope();

container
  .bind<IReportService>(TYPES.IReportService)
  .to(ReportService);

export { container };
