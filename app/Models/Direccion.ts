import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import CentrosDistribucion from './CentrosDistribucion'
import Municipio from './Municipio'
import DirListaOrden from './DirListaOrden'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public carrera: string

  @column()
  public calle: string

  @column()
  public barrio: string

  @column()
  public municipio_id:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>CentrosDistribucion,{
    foreignKey: 'centrosDistribucion_id'
  })
  public centrosDistribucion:BelongsTo<typeof CentrosDistribucion>

  @belongsTo(() => Municipio, {
    //este es el nombre de la clave foranea
    foreignKey: "municipio_id",
  })
  public municipio: BelongsTo<typeof Municipio>;

  @hasMany(() => DirListaOrden, {
    foreignKey: 'direccion_id'
  })
  public dirListaOrden: HasMany<typeof DirListaOrden>
}
