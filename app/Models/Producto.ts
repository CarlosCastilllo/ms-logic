import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'
import Cliente from './Cliente'
import Lote from './Lote'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public fechaVencimiento: DateTime

  @column()
  public clienteId: number

  @column()
  public loteId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relación de 1 a N
  @hasMany(() => CategoriaProducto, {
    foreignKey: "productoId", //Clave foránea que relaciona la identidad dominada
  })
  public categoriaProducto: HasMany<typeof CategoriaProducto>;

  //Relacion 1 a N
  @belongsTo(() => Cliente,{
    foreignKey: 'clienteId'//Clave foránea que relaciona con la identidad dominante
  })
  public cliente: BelongsTo<typeof Cliente>

  //Relación 1 a N
  @belongsTo(() => Lote,{
    foreignKey: 'loteId' //Clave foránea que relaciona con la identidad dominante
  })
  public lote: BelongsTo<typeof Lote>
}
