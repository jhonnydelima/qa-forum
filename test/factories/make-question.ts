import { faker } from '@faker-js/faker'
import { IdEntity } from '@/core/entities/id-entity'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
  overrides: Partial<QuestionProps> = {},
  id?: string,
) {
  const question = Question.create(
    {
      authorId: new IdEntity(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overrides,
    },
    id,
  )
  return question
}
