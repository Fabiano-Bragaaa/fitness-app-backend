import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { exercisesService } from 'src/exercises/exercises.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
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
  constructor(private exercise: exercisesService) {}

  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body(updateValidationPipe) body: ExerciseUpdateBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { sub: userId } = user

    const { exercise } = await this.exercise.findById(id)

    if (!exercise || exercise.userId !== userId) {
      throw new Error('Exercise not found or unathoized')
    }

    await this.exercise.update(id, body)
  }
}
