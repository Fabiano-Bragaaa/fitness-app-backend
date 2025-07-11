import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request'
import { ChatCompletionMessageParam } from 'openai/resources/index'

@Injectable()
export class OpenaiService {
  constructor(private readonly openai: OpenAI) {}

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    return this.openai.chat.completions.create({
      messages: messages as ChatCompletionMessageParam[],
      model: 'gpt-3.5-turbo',
    })
  }
}
