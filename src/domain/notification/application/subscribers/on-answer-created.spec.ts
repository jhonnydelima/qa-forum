import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { OnAnswerCreated } from './on-answer-created'
import { makeAnswer } from 'test/factories/make-answer'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository,
    )
  })

  it('should send a notification when an answer is created', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sut = new OnAnswerCreated()
    const answer = makeAnswer()
    await answersRepository.create(answer)
  })
})
