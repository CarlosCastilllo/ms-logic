import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import Direccion from './Direccion'
import Ruta from './Ruta'

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orden:number

  @column()
  public descripcion:string

  @column()
  public ruta_id:number

  @column()
  public direccion_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Ruta,{
    foreignKey: 'ruta_id'
  })
  public ruta: BelongsTo<typeof Ruta>

  @belongsTo(()=> Direccion,{
    foreignKey: 'direccion_id'
  })
  public direccion : BelongsTo<typeof Direccion>

  @hasOne(() =>Lote,{
    foreignKey:'dir_lista_orden_id'
  })
  public lote:HasOne<typeof Lote>
}
