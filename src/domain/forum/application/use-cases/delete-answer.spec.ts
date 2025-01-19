import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'

let answersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(answersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer()
    await answersRepository.create(newAnswer)
    expect(answersRepository.items).toHaveLength(1)
    await sut.execute({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })
    expect(answersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another user', async () => {
    const newAnswer = makeAnswer()
    await answersRepository.create(newAnswer)
    expect(answersRepository.items).toHaveLength(1)
    await expect(() =>
      sut.execute({
        authorId: 'another-author-id',
        answerId: newAnswer.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(answersRepository.items).toHaveLength(1)
  })

  it('should not be able to delete an answer that does not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-id',
        answerId: 'answer-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
