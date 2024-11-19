import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso:number

  @column() 
  public rutaId: number

  @column()
  public ordenListaId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relacion n a 1 con Producto
  // @hasMany(()=>Producto,{
  //   foreignKey:'loteId'
  // })
  // public productos: HasMany<typeof Producto>

  //relacion 1 a 1 con OrdenLista
  // @hasMany(()=>OrdenLista,{
  //   foreignKey:'loteId'
  // })
  // public ordenListas: HasMany<typeof OrdenLista>

  //relacion n a 1 con Ruta
  @belongsTo(()=> Ruta,{
    foreignKey:'rutaId'
  })
  public rutas: BelongsTo<typeof Ruta>
}
