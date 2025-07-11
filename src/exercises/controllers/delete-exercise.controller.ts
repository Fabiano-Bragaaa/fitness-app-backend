import {
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ExercisesService } from 'src/exercises/exercises.service'

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class DeleteExerciseController {
  constructor(private exercises: ExercisesService) {}

  @Delete(':id')
  async handle(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    const { sub: userId } = user

    const { exercise } = await this.exercises.findById(id)

    if (!exercise) {
      throw new NotFoundException('Exercise not found')
    }

    if (exercise.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to access this exercise',
      )
    }
    await this.exercises.delete(id)
  }
}
