import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let answersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(answersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer()
    await answersRepository.create(newAnswer)
    expect(answersRepository.items).toHaveLength(1)
    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'New Content',
    })
    expect(answersRepository.items[0]).toMatchObject({
      content: 'New Content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer()
    await answersRepository.create(newAnswer)
    expect(answersRepository.items).toHaveLength(1)
    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'another-author-id',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(answersRepository.items).toHaveLength(1)
  })

  it('should not be able to edit a answer that does not exist', async () => {
    await expect(() =>
      sut.execute({
        answerId: 'answer-id',
        authorId: 'author-id',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
