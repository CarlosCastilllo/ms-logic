import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'
import Producto from './Producto'
import DirListaOrden from './DirListaOrden'

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
  @hasMany(()=>Producto,{
    foreignKey:'loteId'
  })
  public productos: HasMany<typeof Producto>


   @hasMany(()=>DirListaOrden,{
 foreignKey:'loteId'
  })
  public dirListaOrdens: HasMany<typeof DirListaOrden>

  //relacion n a 1 con Ruta
  @belongsTo(()=> Ruta,{
    foreignKey:'rutaId'
  })
  public ruta: BelongsTo<typeof Ruta>
}
