import { injectable } from "inversify";
import { IMailer } from "../../domain/interfaces/IMailer";
import { getMailClient } from "../mail";

@injectable()
export class MailerAdapter implements IMailer {
    async send(to: string, subject: string, body: string): Promise<void> {
        if (process.env.APP_ENV === 'prod') {
            const transporter = await getMailClient();
            await transporter.sendMail({
                from: '"Sistema IoC" <noreply@sistema.com>',
                to,
                subject,
                text: body
            });
        } else {
            console.log(`[DEV MODE] E-mail simulado para ${to}: ${body}`);
        }
    }
}