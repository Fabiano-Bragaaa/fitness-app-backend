import { Module } from '@nestjs/common'
import { OpenaiController } from '../controllers/openai.controller'
import { OpenaiService } from './openai.service'
import OpenAI from 'openai'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  controllers: [OpenaiController],
  imports: [ConfigModule],
  providers: [
    OpenaiService,
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({ apiKey: configService.getOrThrow('OPENAI_SECRET_KEY') }),
      inject: [ConfigService],
    },
  ],
})
export class OpenaiModule {}
