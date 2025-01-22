import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueIdEntity } from '@/core/entities/unique-id-entity'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'

export type QuestionProps = {
  authorId: UniqueIdEntity
  bestAnswerId?: UniqueIdEntity
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
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

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set bestAnswerId(value: UniqueIdEntity | undefined) {
    this.props.bestAnswerId = value
    this.touch()
  }

  set title(value: string) {
    this.props.title = value
    this.props.slug = Slug.createFromText(value)
    this.touch()
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: string,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }
}
