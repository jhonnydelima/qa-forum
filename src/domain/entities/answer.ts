import { Entity } from "../../core/entities/entity"
import { IdEntity } from "../../core/entities/id-entity"
import { Optional } from "../../core/types/optional"

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

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: string) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id)
    return answer
  }
}
