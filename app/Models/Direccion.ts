import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import CentrosDistribucion from './CentrosDistribucion'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public carrera: string

  @column()
  public calle: string

  @column()
  public barrio: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(()=>CentrosDistribucion,{
    foreignKey: 'direccion_id'
  })
  public theater:HasOne<typeof CentrosDistribucion>
}
