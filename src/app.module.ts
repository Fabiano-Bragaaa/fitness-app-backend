import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.contoller';
import { envSchema } from './env';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }), OpenaiModule],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}
