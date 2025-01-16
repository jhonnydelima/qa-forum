import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"

type QuestionProps = {
  title: string
  slug: Slug
  content: string
  authorId: string
}

export class Question extends Entity<QuestionProps> {}