import nodemailer from 'nodemailer';
import logger from './logger';

let transporter: nodemailer.Transporter | null = null;

export const getMailClient = async () => {
  if (transporter) return transporter;

  if (process.env.APP_ENV === "prod") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    logger.info("Mailer configurado");
    return transporter;
  }

  // Cria uma conta de teste no Ethereal automaticamente
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  logger.info(`Ethereal Mail configurado: ${testAccount.user}`);
  return transporter;
};