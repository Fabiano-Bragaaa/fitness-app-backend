import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'
import { JwtStrategy } from './jwt.strategy'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.contoller'
import { LogoutController } from './controllers/logout.controller'
import { RefreshTokenController } from './controllers/refresh-token.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    LogoutController,
    RefreshTokenController,
  ],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
