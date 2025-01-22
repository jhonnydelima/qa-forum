import { UniqueIdEntity } from '@/core/entities/unique-id-entity'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

type AnswerQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueIdEntity(authorId),
      questionId: new UniqueIdEntity(questionId),
    })
    await this.answersRepository.create(answer)
    return {
      answer,
    }
  }
}
