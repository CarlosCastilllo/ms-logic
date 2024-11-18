import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administador from './Administador'
import Gasto from './Gasto'
import Hotel from './Hotel'
import Restaurante from './Restaurante'

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

  @hasMany(() => Gasto,{
    //este es el nombre de la clave foranea
    foreignKey:'servicio_id'
  })
  public Gastos: HasMany<typeof Gasto>

  @hasOne(() => Hotel,{
    foreignKey:'servicio_id'
  })
  public Hotel: HasOne<typeof Hotel>

  @hasOne(() => Restaurante,{
    foreignKey:'servicio_id'
  })
  public restaurante: HasOne<typeof Restaurante>
}
