import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehiculo from './Vehiculo'
import Contrato from './Contrato'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public inicio : string

  @column()
  public destino : string

  @column()
  public distancia : number

  @column()
  public entrega_estimada : DateTime

  @column()
  public contrato_id:number

  @column()
  public vehiculo_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehiculo,{
    //este es el nombre de la clave foranea
    foreignKey:'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  @belongsTo(() => Contrato,{
    //este es el nombre de la clave foranea
    foreignKey:'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>
}
