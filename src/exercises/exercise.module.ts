import { Module } from '@nestjs/common'
import { CreateExerciseController } from './controllers/create-exercise.controller'
import { exercisesService } from './exercises.service'
import { FetchExercisesController } from './controllers/fetch-exercises.controller'
import { DeleteExerciseController } from './controllers/delete-exercise.controller'

@Module({
  controllers: [
    CreateExerciseController,
    FetchExercisesController,
    DeleteExerciseController,
  ],
  providers: [exercisesService],
})
export class ExercisesModule {}
