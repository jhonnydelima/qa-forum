import { faker } from '@faker-js/faker'
import { IdEntity } from '@/core/entities/id-entity'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(overrides: Partial<AnswerProps> = {}, id?: string) {
  const answer = Answer.create(
    {
      authorId: new IdEntity(),
      questionId: new IdEntity(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id,
  )
  return answer
}
