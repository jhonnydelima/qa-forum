import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { IdEntity } from "../../core/entities/id-entity"

type QuestionProps = {
  authorId: IdEntity
  bestAnswerId?: IdEntity
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}