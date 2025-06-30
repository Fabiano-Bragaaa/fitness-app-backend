import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OpenaiModule } from './openai/openai.module'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { ExercisesModule } from './exercises/exercise.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    OpenaiModule,
    AuthModule,
    ExercisesModule,
    PrismaModule,
  ],
})
export class AppModule {}
