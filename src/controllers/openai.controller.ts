import { Body, Controller, Post } from '@nestjs/common'
import { CreateChatCompletionRequest } from '../openai/dto/create-chat-completion.request'
import { OpenaiService } from '../openai/openai.service'

@Controller('openai')
export class OpenaiController {
  constructor(private readonly apenaiService: OpenaiService) {}
  @Post('chatCompletion')
  async createChatCompletion(@Body() body: CreateChatCompletionRequest) {
    return this.apenaiService.createChatCompletion(body.messages)
  }
}
