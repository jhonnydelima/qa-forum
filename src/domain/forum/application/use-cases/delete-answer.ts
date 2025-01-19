import { AnswersRepository } from '../repositories/answers-repository'

type DeleteAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = object

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.answersRepository.delete(answer)
    return {}
  }
}
