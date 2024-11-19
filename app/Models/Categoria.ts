import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public categoriaPadreId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Categoria, {
    foreignKey: 'categoriaPadreId', 
  })
  public subCategorias: HasMany<typeof Categoria>

  @belongsTo(() => Categoria, {
    foreignKey: 'categoriaPadreId', 
  })
  public padres: BelongsTo<typeof Categoria>

  @hasMany(() => CategoriaProducto, {
    foreignKey: "categoriaId", //Clave foránea que relaciona la identidad dominada
  })
  public categoriaProducto: HasMany<typeof CategoriaProducto>;
}
