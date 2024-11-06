import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Servicio from './Servicio'

export default class Administador extends BaseModel {
  @belongsTo(() => Usuario)
  public usuario: BelongsTo<typeof Usuario>

  @column({ isPrimary: true })
  public id: number

  @column()
  public servicio_id: number


  @column()
  public usuarioId: number

  @column()
  public cuenta: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio, {
    foreignKey: 'id_administrador'
  })
  public servicio: BelongsTo<typeof Servicio>
}
