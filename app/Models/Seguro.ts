import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'

export default class Seguro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public costo : string

  @column()
  public asegurado : boolean

  @column()
  public fecha_expedicion : DateTime

  @column()
  public fecha_vencimiento : DateTime

  @column()
  public vehiculo_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo,{
    //este es el nombre de la clave foranea
    foreignKey:'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}
