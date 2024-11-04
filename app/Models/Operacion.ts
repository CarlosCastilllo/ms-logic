import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Vehiculo from './Vehiculo'

export default class Operacion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public municipio_id:number

  @column()
  public vehiculo_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipio,{
    //este es el nombre de la clave foranea
    foreignKey:'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>

  @belongsTo(() => Vehiculo,{
    //este es el nombre de la clave foranea
    foreignKey:'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}
