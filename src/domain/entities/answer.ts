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
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: string) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id)
    return answer
  }
}
