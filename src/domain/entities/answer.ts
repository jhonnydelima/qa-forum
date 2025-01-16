import { Entity } from "../../core/entities/entity"
import { IdEntity } from "../../core/entities/id-entity"

type AnswerProps = {
  authorId: IdEntity
  questionId: IdEntity
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}