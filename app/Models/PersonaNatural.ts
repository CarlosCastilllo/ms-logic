import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa'
import Cliente from './Cliente'

export default class PersonaNatural extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_documento : string

  @column()
  public documento : string

  @column()
  public nacimiento : DateTime

  @column()
  public usuario_id : number

  @column()
  public cliente_id : number

  @column()
  public empresa_id : number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Empresa, {
    foreignKey: "empresa_id",
  })
  public empresa: BelongsTo<typeof Empresa>;

  //Relación de 1 a N
  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id",
  })
  public cliente: BelongsTo<typeof Cliente>;
}
