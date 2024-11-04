import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'

export default class Departamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre:string

  @column()
  public habitantes:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Municipio,{
    //este es el nombre de la clave foranea
    foreignKey:'departamento_id'
  })
  public municipios: HasMany<typeof Municipio>
}
