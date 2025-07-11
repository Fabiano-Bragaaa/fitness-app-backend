import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ExercisesService } from '../exercises.service'

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
  constructor(private exerciseService: ExercisesService) {}

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
