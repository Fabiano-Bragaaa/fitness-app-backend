import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { OpenaiModule } from './openai/openai.module'
import { CreateAccountController } from './controllers/create-account.contoller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { UpdateExerciseController } from './controllers/update-exercise.controller'
import { DeleteExerciseController } from './controllers/delete-exercise.controller'
import { LogoutController } from './controllers/logout.controller'
import { RefreshTokenController } from './controllers/refresh-token.controller'
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
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UpdateExerciseController,
    DeleteExerciseController,
    LogoutController,
    RefreshTokenController,
  ],
})
export class AppModule {}
