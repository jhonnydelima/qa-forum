import { IdEntity } from "./id-entity"

export class Entity<TProps> {
  private _id: IdEntity
  protected props: TProps

  get id() {
    return this._id
  }

  protected constructor(props: TProps, id?: string) {
    this.props = props
    this._id = new IdEntity(id)
  }
}