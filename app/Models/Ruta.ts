import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import DirListaOrden from './DirListaOrden'

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() //FK de direccion
  public direccionId: number

  @column() 
  public puntoInicio: string

  @column()
  public puntoFin: string

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
}
