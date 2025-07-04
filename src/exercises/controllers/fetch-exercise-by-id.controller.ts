import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { ExercisesService } from '../exercises.service'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class FetchExerciseByIdController {
  constructor(private exercises: ExercisesService) {}

  @Get(':id')
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

    return { exercise }
  }
}
