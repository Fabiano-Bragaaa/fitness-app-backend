import { Module } from '@nestjs/common'
import { CreateExerciseController } from './controllers/create-exercise.controller'
import { exercisesService } from './exercises.service'
import { FetchExercisesController } from './controllers/fetch-exercises.controller'
import { DeleteExerciseController } from './controllers/delete-exercise.controller'
import { UpdateExerciseController } from './controllers/update-exercise.controller'

@Module({
  controllers: [
    CreateExerciseController,
    FetchExercisesController,
    DeleteExerciseController,
    UpdateExerciseController,
  ],
  providers: [exercisesService],
})
export class ExercisesModule {}
