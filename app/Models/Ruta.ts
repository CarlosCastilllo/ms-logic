import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import DirListaOrden from './DirListaOrden'
import Vehiculo from './Vehiculo'
import Contrato from './Contrato'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() //FK de direccion
  public inicio: string

  @column() 
  public destino: string

  @column()
  public distancia: number

  @column()
  public entrega_estimada: DateTime

  @column()
  public contrato_id:number

  @column()
  public vehiculo_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relacion n a 1 con Lotes
  @hasMany(()=>Lote,{
    foreignKey:'rutaId'
  })
  public lotes: HasMany<typeof Lote>

  @hasMany(() => DirListaOrden, {
    foreignKey: 'ruta_id'
  })
  public dirListaOrden: HasMany<typeof DirListaOrden>

  @belongsTo(()=> Contrato,{
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  @belongsTo(()=> Vehiculo,{
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>
}
