import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question) => {
    return console.log(question)
  },
}

it('create a question', async () => {
  const questionQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)
  const { question } = await questionQuestion.execute({
    authorId: '1',
    title: 'New question',
    content: 'Question content',
  })
  expect(question.id).toBeTruthy()
  expect(question.title).toEqual('New question')
})
