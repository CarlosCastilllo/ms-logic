import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public telefono: number

  @column()
  public num_licencia: number

  @column()
  public vencimiento: Date

  @column()
  public usuario_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*@hasOne(() => Dueño,{
    foreignKey:'conductor_id'
  })
  public dueño: HasOne<typeof Dueño>*/

  @hasMany(() => Turno,{
    foreignKey:'conductor_id'
  })
  public turno: HasMany<typeof Turno>

  /*@hasOne(() => Usuario,{
    foreignKey:'usuario_id'
  })
  public usuario: HasOne<typeof Usuario>*/
}
