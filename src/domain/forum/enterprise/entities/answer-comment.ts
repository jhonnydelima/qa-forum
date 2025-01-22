import { Entity } from '@/core/entities/entity'
import { UniqueIdEntity } from '@/core/entities/unique-id-entity'
import { Optional } from '@/core/types/optional'

export type AnswerCommentProps = {
  authorId: UniqueIdEntity
  answerId: UniqueIdEntity
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  get authorId() {
    return this.props.authorId
  }

  get answerId() {
    return this.props.answerId
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: string) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return answerComment
  }
}
