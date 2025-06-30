import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { exercisesService } from 'src/exercises/exercises.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const exerciseBodySchema = z.object({
  name: z.string(),
  duration: z.string(),
  intensity: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(exerciseBodySchema)

type ExerciseBodySchema = z.infer<typeof exerciseBodySchema>

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class CreateExerciseController {
  constructor(private exerciseService: exercisesService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: ExerciseBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { duration, intensity, name } = body
    const { sub: userId } = user

    await this.exerciseService.create({ name, duration, intensity, userId })
  }
}
