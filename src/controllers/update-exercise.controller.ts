import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const exerciseBodySchema = z.object({
  name: z.string(),
  duration: z.string(),
  intensity: z.string(),
})

const exerciseUpdateBodySchema = exerciseBodySchema.partial()

const updateValidationPipe = new ZodValidationPipe(exerciseUpdateBodySchema)

type ExerciseUpdateBodySchema = z.infer<typeof exerciseUpdateBodySchema>

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class UpdateExerciseController {
  constructor(private prisma: PrismaService) {}

  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body(updateValidationPipe) body: ExerciseUpdateBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user

    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    if (!exercise || exercise.userId !== userId) {
      throw new Error('Exercise not found or unathoized')
    }

    await this.prisma.exercise.update({
      where: { id },
      data: body,
    })
  }
}
