import { Entity } from '@/core/entities/entity'
import { UniqueIdEntity } from '@/core/entities/unique-id-entity'
import { Optional } from '@/core/types/optional'

export type QuestionCommentProps = {
  authorId: UniqueIdEntity
  questionId: UniqueIdEntity
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: string,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return questionComment
  }
}
