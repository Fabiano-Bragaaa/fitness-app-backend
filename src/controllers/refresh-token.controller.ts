import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/refresh')
export class RefreshToken {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body

    try {
      const payload = this.jwt.verify(refresh_token)

      const storedToken = await this.prisma.refreshToken.findFirst({
        where: { token: refresh_token },
      })

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found.')
      }

      if (storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token expired.')
      }

      const newAccessToken = this.jwt.sign(
        { sub: payload.sub },
        { expiresIn: '15m' },
      )

      return { access_token: newAccessToken }
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token.')
    }
  }
}
