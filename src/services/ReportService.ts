import { injectable, inject } from "inversify";
import { faker } from "@faker-js/faker";
import { IReportService } from "../domain/interfaces/IReportService";
import { ILogger } from "../domain/interfaces/ILogger";
import { IMailer } from "../domain/interfaces/IMailer";
import { TYPES } from "../infra/types";

export class InvalidReportSizeError extends Error {
    constructor() {
        super("Número inválido de registros.");
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

        const data = Array.from({ length: n }, () => ({
            nome: faker.person.fullName(),
            cidade: faker.location.city(),
        }));

        const reportContent = JSON.stringify(data, null, 2);

        await this.mailer.send(email, "Enviando Relatório de Dados", reportContent);

        this.logger.info("Relatório gerado e enviado com sucesso.");
    }
}