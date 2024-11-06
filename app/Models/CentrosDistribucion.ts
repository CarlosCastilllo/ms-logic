import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'

export default class CentrosDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public telefono: number
  
  @column()
  public direccion_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Direccion,{
    foreignKey: 'direccion_id'
  })
  public projector:BelongsTo<typeof Direccion>
}
