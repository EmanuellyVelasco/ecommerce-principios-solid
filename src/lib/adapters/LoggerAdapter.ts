import { injectable } from "inversify";
import logger from '../logger';
import { ILogger } from '../../domain/interfaces/ILogger';

@injectable()
export class LoggerAdapter implements ILogger {
  info(msg: string): void { logger.info(msg); }
  warn(msg: string): void { logger.warn(msg); }
  error(msg: string): void { logger.error(msg); }
}