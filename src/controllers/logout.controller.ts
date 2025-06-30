import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/logout')
@UseGuards(JwtAuthGuard)
export class LogoutController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@CurrentUser() user: UserPayload) {
    const { sub: userId } = user

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    })

    return { message: 'logged out' }
  }
}
