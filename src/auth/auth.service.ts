import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return { user }
  }

  async createToken(id: string, token: string) {
    await this.prisma.refreshToken.create({
      data: {
        userId: id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })
  }

  async token(id: string) {
    const accessToken = await this.jwt.sign({ sub: id }, { expiresIn: '15m' })

    return { accessToken }
  }

  async refreshToken(id: string) {
    const refreshToken = await this.jwt.sign({ sub: id }, { expiresIn: '7d' })

    return { refreshToken }
  }

  async create(email: string, password: string) {
    await this.prisma.user.create({
      data: {
        email,
        password,
      },
    })
  }

  async logout(id: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId: id },
    })
  }
}
