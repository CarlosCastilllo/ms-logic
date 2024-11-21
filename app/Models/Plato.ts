import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlatoRestaurante from './PlatoRestaurante'

export default class Plato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => PlatoRestaurante, {
    foreignKey: "plato_id", //Clave foránea que relaciona la identidad dominada
  })
  public platoRestaurante: HasMany<typeof PlatoRestaurante>;
}
