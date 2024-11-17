import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public fecha_inicio:Date

  @column()
  public fecha_fin:Date

  @column()
  public conductor_id:number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Conductor, {
    foreignKey: "conductor_id",
  })
  public conductor: BelongsTo<typeof Conductor>;
}
