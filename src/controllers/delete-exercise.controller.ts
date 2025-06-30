import { Controller, Delete, Param, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class DeleteExerciseController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  async handle(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    const { sub: userId } = user

    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    if (!exercise || exercise.userId !== userId) {
      throw new Error('Exercise not found or unathoized')
    }

    await this.prisma.exercise.delete({
      where: {
        id,
      },
    })
  }
}
