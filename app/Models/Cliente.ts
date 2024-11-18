import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public telefono : number

  @column()
  public cantidad_pedidos

  @column()
  public usuario_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contrato,{
    //este es el nombre de la clave foranea
    foreignKey:'cliente_id'
  })
  public contratos: HasMany<typeof Contrato>
}
