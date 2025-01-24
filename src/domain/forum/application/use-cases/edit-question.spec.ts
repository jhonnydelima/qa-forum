import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'another-author-id',
      title: 'New Title',
      content: 'New Content',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to edit a question that does not exist', async () => {
    const result = await sut.execute({
      questionId: 'question-id',
      authorId: 'author-id',
      title: 'New Title',
      content: 'New Content',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
