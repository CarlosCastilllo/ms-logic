import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Cuota from './Cuota'
import Ruta from './Ruta'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio : DateTime

  @column()
  public fecha_fin : DateTime

  @column()
  public cliente_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente,{
    //este es el nombre de la clave foranea
    foreignKey:'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(() =>Cuota,{
    //este es el nombre de la clave foranea
    foreignKey:'contrato_id'
  })
  public cuotas: HasMany<typeof Cuota>

  @hasMany(() => Ruta,{
    //este es el nombre de la clave foranea
    foreignKey:'contrato_id'
  })
  public rutas: HasMany<typeof Ruta>
}
