import { LoggerService, ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger implements LoggerService {
  log(message: any, context?: string, ...args): void {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }
    super.log.apply(this, args);
  }
}
