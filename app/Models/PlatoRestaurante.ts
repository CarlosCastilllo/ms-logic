import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Plato from './Plato'
import Restaurante from './Restaurante'

export default class PlatoRestaurante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plato_id: number

  @column()
  public restaurante_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Plato, {
    foreignKey: 'plato_id',
  })
  public plato: BelongsTo<typeof Plato>

  @belongsTo(()=>Restaurante,{
    foreignKey:'restaurante_id'
  })
  public restaurante:BelongsTo<typeof Restaurante>
}
