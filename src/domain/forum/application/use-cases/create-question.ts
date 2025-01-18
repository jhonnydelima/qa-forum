import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { IdEntity } from '@/core/entities/id-entity'

type CreateQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new IdEntity(authorId),
      title,
      content,
    })
    await this.questionsRepository.create(question)
    return {
      question,
    }
  }
}
