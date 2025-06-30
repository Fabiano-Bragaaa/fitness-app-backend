import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface CreateExerciseParams {
  name: string
  duration: string
  intensity: string
  userId: string
}

@Injectable()
export class exercisesService {
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

  async fetch(page: number, userId: string) {
    const perPage = 20

    await this.prisma.exercise.findMany({
      where: {
        userId,
      },
      take: perPage,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
