// src/http/controllers/ReportController.ts
import { Request, Response } from "express";
import { container } from "../../infra/container";
import { TYPES } from "../../infra/types";
import { IReportService } from "../../domain/interfaces/IReportService";
import { InvalidReportSizeError } from "../../services/ReportService";

export class ReportController {
  static async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { n } = req.params;
      const { email } = req.query;

      if (!email || typeof email !== "string") {
        return res.status(400).json({
          message: "'email' é obrigatório."
        });
      }

      const amount = Number(n);

      if (isNaN(amount)) {
        return res.status(400).json({
          message: "'n' deve ser um número."
        });
      }

      const reportService = container.get<IReportService>(
        TYPES.IReportService
      );

      await reportService.generateAndSend(email, amount);

      return res.status(200).json({
        message: "Relatório enviado com sucesso."
      });

    } catch (error: any) {

      if (error instanceof InvalidReportSizeError) {
        return res.status(400).json({
          message: error.message
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Erro interno ao gerar relatório."
      });
    }
  }
}
