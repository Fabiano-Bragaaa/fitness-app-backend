import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const createAccountBodySchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password'],
  });

  const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller()
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post('/accounts')
  async handle(@Body(bodyValidationPipe) body: CreateAccountBodySchema) {
    const { email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address alredy exists',
      );
    }

    const hashPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });
  }
}
