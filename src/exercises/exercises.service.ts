import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface CreateExerciseParams {
  name: string
  duration: string
  intensity: string
  userId: string
}

interface UpdateExerciseParams {
  name?: string
  duration?: string
  intensity?: string
}

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create({ duration, intensity, name, userId }: CreateExerciseParams) {
    return this.prisma.exercise.create({
      data: {
        name,
        duration,
        intensity,
        userId,
      },
    })
  }

  async fetch(userId: string) {
    return await this.prisma.exercise.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async delete(id: string) {
    await this.prisma.exercise.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    return { exercise }
  }

  async update(id: string, params: UpdateExerciseParams) {
    await this.prisma.exercise.update({
      where: {
        id,
      },
      data: params,
    })
  }
}
