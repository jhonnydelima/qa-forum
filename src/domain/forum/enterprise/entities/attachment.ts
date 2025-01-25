import { Entity } from '@/core/entities/entity'

type AttachmentProps = {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttachmentProps, id?: string) {
    const attachment = new Attachment(props, id)
    return attachment
  }
}
