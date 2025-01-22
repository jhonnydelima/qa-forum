import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchAnswersByQuestionUseCase } from './fetch-answers-by-question'
import { makeAnswer } from 'test/factories/make-answer'
import { IdEntity } from '@/core/entities/id-entity'

let answersRepository: InMemoryAnswersRepository
let sut: FetchAnswersByQuestionUseCase

describe('Fetch Answers By Question Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new FetchAnswersByQuestionUseCase(answersRepository)
  })

  it('should be able to fetch answers by a question', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new IdEntity('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new IdEntity('question-1'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new IdEntity('question-1'),
      }),
    )
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })
    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers by a question', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new IdEntity('question-1'),
        }),
      )
    }
    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })
    expect(answers).toHaveLength(2)
  })
})
