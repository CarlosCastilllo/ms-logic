import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'
import Municipio from './Municipio'

export default class CentrosDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public telefono: number

  @column()
  public municipio_id:number

  @column()
  public direccion_id:number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => Direccion,{
    foreignKey:'centrosDistribucion_id'
  })
  public direccion: HasOne<typeof Direccion>

  @belongsTo(() => Municipio, {
    //este es el nombre de la clave foranea
    foreignKey: "municipio_id",
  })
  public municipio: BelongsTo<typeof Municipio>;
  
}
