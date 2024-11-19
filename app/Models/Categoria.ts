import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import CategoriaProducto from './CategoriaProducto';

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string;

  @column()
  public descripcion: string;

  @column()
  public categoria_padre: number | null;

  @column()
  public detalle : string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Categoria, {
    foreignKey: "categoria_padre",
  })
  public subCategoria: HasOne<typeof Categoria>;

  // Relación "pertenece a"
  @belongsTo(() => Categoria, {
    foreignKey: "categoria_padre",
  })
  public categoriaPadre: BelongsTo<typeof Categoria>;

  @hasMany(() => CategoriaProducto, {
    foreignKey: "categoriaId", //Clave foránea que relaciona la identidad dominada
  })
  public categoriaProducto: HasMany<typeof CategoriaProducto>;
}
