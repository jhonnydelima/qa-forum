import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { IdEntity } from "../../core/entities/id-entity"
import { Optional } from "../../core/types/optional"

type QuestionProps = {
  authorId: IdEntity
  bestAnswerId?: IdEntity
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: string) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id)
    return question
  }
}
