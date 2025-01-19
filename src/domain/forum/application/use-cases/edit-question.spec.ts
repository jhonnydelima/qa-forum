import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion()
    await questionsRepository.create(newQuestion)
    expect(questionsRepository.items).toHaveLength(1)
    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: 'New Title',
      content: 'New Content',
    })
    expect(questionsRepository.items[0]).toMatchObject({
      title: 'New Title',
      content: 'New Content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion()
    await questionsRepository.create(newQuestion)
    expect(questionsRepository.items).toHaveLength(1)
    await expect(() =>
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'another-author-id',
        title: 'New Title',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error)
    expect(questionsRepository.items).toHaveLength(1)
  })

  it('should not be able to edit a question that does not exist', async () => {
    await expect(() =>
      sut.execute({
        questionId: 'question-id',
        authorId: 'author-id',
        title: 'New Title',
        content: 'New Content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
