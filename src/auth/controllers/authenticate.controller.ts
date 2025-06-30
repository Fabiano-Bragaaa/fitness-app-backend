import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { hashToken } from 'src/utils/token-utils'
import { z } from 'zod'
import { AuthService } from '../auth.service'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema)

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authService: AuthService) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateBodySchema) {
    const { email, password } = body

    const { user } = await this.authService.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const { accessToken } = await this.authService.token(user.id)

    const { refreshToken } = await this.authService.refreshToken(user.id)

    const hashedRefreshToken = await hashToken(refreshToken)

    await this.authService.createToken(user.id, hashedRefreshToken)

    return { access_token: accessToken, refresh_token: refreshToken }
  }
}
