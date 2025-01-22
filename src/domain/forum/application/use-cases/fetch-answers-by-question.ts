import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

type FetchAnswersByQuestionUseCaseRequest = {
  questionId: string
  page: number
}

type FetchAnswersByQuestionUseCaseResponse = {
  answers: Answer[]
}

export class FetchAnswersByQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchAnswersByQuestionUseCaseRequest): Promise<FetchAnswersByQuestionUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )
    return {
      answers,
    }
  }
}
