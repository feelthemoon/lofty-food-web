import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { TableModule } from './tables/table.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './models/user.model';
import { OrderModel } from './models/order.model';
import { OrdersModule } from './orders/orders.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TableModule,
    UsersModule,
    OrdersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, OrderModel],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
    MailModule.register()
  ],
})
export class AppModule {}
