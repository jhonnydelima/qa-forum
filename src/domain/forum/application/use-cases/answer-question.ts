import { IdEntity } from '@/core/entities/id-entity'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

type AnswerQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new IdEntity(authorId),
      questionId: new IdEntity(questionId),
    })
    await this.answersRepository.create(answer)
    return answer
  }
}
