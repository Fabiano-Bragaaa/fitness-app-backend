import { Body, Controller } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/logout')
export class LogoutController {
  constructor(private prisma: PrismaService) {}

  async handle(@Body() body: { userId: string }) {
    const { userId } = body

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    })

    return { message: 'logged out' }
  }
}
