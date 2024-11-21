import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Servicio from './Servicio'

export default class Administrador extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public usuario_id: string

  @column()
  public cuenta: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio, {
    foreignKey: 'administrador_id'
  })
  public servicio: BelongsTo<typeof Servicio>
}