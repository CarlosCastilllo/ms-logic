import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import PlatoRestaurante from './PlatoRestaurante'

export default class Restaurante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public estrellas : number

  @column()
  public direccion : string

  @column()
  public servicio_id :number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio,{
    //este es el nombre de la clave foranea
    foreignKey:'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>

  @hasMany(() => PlatoRestaurante, {
    foreignKey: "restaurante_id", //Clave foránea que relaciona la identidad dominada
  })
  public platoRestaurante: HasMany<typeof PlatoRestaurante>;
}
