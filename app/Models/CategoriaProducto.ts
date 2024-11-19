import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'
import Categoria from './Categoria'

export default class CategoriaProducto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public productoId: number

  @column()
  public categoriaId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Producto, {
    foreignKey: 'productoId',
  })
  public producto: BelongsTo<typeof Producto>

  @belongsTo(()=>Categoria,{
    foreignKey:'categoriaId'
  })
  public categorias:BelongsTo<typeof Categoria>
}
