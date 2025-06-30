import { Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { UserPayload } from "src/auth/jwt.strategy";

@Controller('/exercises')
@UseGuards(JwtAuthGuard)
export class CreateExerciseController {
  constructor () {}

  @Post()
  async handle(@CurrentUser() user: UserPayload){
    return {user}
  }
}