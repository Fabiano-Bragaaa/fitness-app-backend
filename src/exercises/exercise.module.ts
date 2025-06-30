import { Module } from '@nestjs/common'
import { CreateExerciseController } from './controllers/create-exercise.controller'
import { exercisesService } from './exercises.service'
import { FetchExercisesController } from './controllers/fetch-exercises.controller'

@Module({
  controllers: [CreateExerciseController, FetchExercisesController],
  providers: [exercisesService],
})
export class ExercisesModule {}
