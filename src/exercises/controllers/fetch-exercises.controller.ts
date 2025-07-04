import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { UserPayload } from 'src/auth/jwt.strategy'
import { ExercisesService } from 'src/exercises/exercises.service'

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class FetchExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get()
  async hadle(@CurrentUser() user: UserPayload) {
    const { sub: userId } = user

    const exercises = await this.exercisesService.fetch(userId)

    return { exercises }
  }
}
