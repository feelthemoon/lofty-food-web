import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [MailService],
})
export class MailModule {
  static register(): DynamicModule {
    return {
      module: MailModule,
      providers: [MailService],
      exports: [MailService],
    };
  }
}