import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Gasto from './Gasto'
import Hotel from './Hotel'
import Restaurante from './Restaurante'
import Administrador from './Administrador'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public precio: number

  @column()
  public tipo_servicio: string

  @column()
  public administrador_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relacion uno a uno, un servicio tiene un administrador 
  @hasOne(() => Administrador, {
    foreignKey:'servicio_id'
  })
  public administrador: HasOne<typeof Administrador>

  @hasMany(() => Gasto,{
    //este es el nombre de la clave foranea
    foreignKey:'servicio_id'
  })
  public gastos: HasMany<typeof Gasto>

  @hasOne(() => Hotel,{
    foreignKey:'servicio_id'
  })
  public hotel: HasOne<typeof Hotel>

  @hasOne(() => Restaurante,{
    foreignKey:'servicio_id'
  })
  public restaurante: HasOne<typeof Restaurante>
}
