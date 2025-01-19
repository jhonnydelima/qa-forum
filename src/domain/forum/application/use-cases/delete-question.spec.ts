import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion()
    await questionsRepository.create(newQuestion)
    expect(questionsRepository.items).toHaveLength(1)
    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
    })
    expect(questionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion()
    await questionsRepository.create(newQuestion)
    expect(questionsRepository.items).toHaveLength(1)
    await expect(() =>
      sut.execute({
        authorId: 'another-user-id',
        questionId: newQuestion.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(questionsRepository.items).toHaveLength(1)
  })

  it('should not be able to delete a question that does not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'user-id',
        questionId: 'question-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
