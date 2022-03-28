import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TableService } from 'src/tables/table.service';
import { Cron } from '@nestjs/schedule';
import { promisify } from 'util';
import { appendFile } from 'fs';

const appendFilePromise = promisify(appendFile);


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Cron('0 50 11 * * FRI')
  public async sendEmail(
  ): Promise<void> {
    const [filePath, filename] = TableService.downloadParams();
    await this.mailerService.sendMail({
      to: process.env.MAIL_TO,
      from: process.env.MAIL_USERNAME,
      subject: 'Заказ на следующую неделю',
      html: '<p> Здравствуйте, высылаю заказ на следующую неделю </p>',
      attachments: [
          {
              filename,
              path: filePath
          }
      ]
    });
    await appendFilePromise('./cron.log', `\n[${new Date()}] - Email Sent`);
  }
}