// src/domain/services/ReportService.ts
import { injectable, inject } from "inversify";
import { faker } from "@faker-js/faker";
import { IReportService } from "../domain/interfaces/IReportService";
import { ILogger } from "../domain/interfaces/ILogger";
import { IMailer } from "../domain/interfaces/IMailer";
import { TYPES } from "../infra/types";

export class InvalidReportSizeError extends Error {
    constructor() {
        super("InvalidReportSizeError: Máximo de 10 registros.");
        this.name = "InvalidReportSizeError";
    }
}

@injectable()
export class ReportService implements IReportService {
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IMailer) private mailer: IMailer
    ) {}

    async generateAndSend(email: string, n: number): Promise<void> {

        if (n <= 0 || n > 10) {
            throw new InvalidReportSizeError();
        }

        this.logger.info(`Iniciando geração de relatório para: ${email}`);

        // 2. Gerar n registros fictícios
        const data = Array.from({ length: n }, () => ({
            nome: faker.person.fullName(),
            cidade: faker.location.city(),
        }));

        const reportContent = JSON.stringify(data, null, 2);

        // 4. Enviar o relatório por e-mail
        await this.mailer.send(email, "Relatório de Dados Fictícios", reportContent);

        // 5. Logar o sucesso da operação
        this.logger.info("Relatório gerado e enviado com sucesso.");
    }
}