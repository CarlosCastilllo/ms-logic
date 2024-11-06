import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administador from './Administador'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public precio: number

  @column()
  public tipo_servicio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relacion uno a uno, un servicio tiene un administrador 
  @hasOne(() => Administador, {
    foreignKey:'servicio_id'
  })
  public administrador: HasOne<typeof Administador>
}
