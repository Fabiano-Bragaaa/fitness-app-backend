import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { verifyToken } from 'src/utils/token-utils'
import { AuthService } from '../auth.service'

@Controller('/refresh')
export class RefreshTokenController {
  constructor(private authService: AuthService) {}

  @Post()
  async handle(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body

    try {
      const { payload } = await this.authService.verifyJwt(refresh_token)
      const userId = payload.sub

      const { storedToken } = await this.authService.storedToken(userId)

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found.')
      }

      if (storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token expired.')
      }

      const newAccessToken = this.authService.token(payload.sub)

      return { access_token: newAccessToken }
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token.')
    }
  }
}
