import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueIdEntity } from '@/core/entities/unique-id-entity'

let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
      attachmentsIds: ['1', '2'],
    })
    expect(result.isRight()).toBe(true)
    expect(questionsRepository.items[0]).toEqual(result.value?.question)
    expect(questionsRepository.items[0].attachments).toHaveLength(2)
    expect(questionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueIdEntity('1') }),
      expect.objectContaining({ attachmentId: new UniqueIdEntity('2') }),
    ])
  })
})
