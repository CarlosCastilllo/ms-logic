import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo_empresa : string

  @column()
  public direccion_fiscal : string

  @column()
  public cliente_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente,{
    //este es el nombre de la clave foranea
    foreignKey:'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasOne(() => PersonaNatural, {
    foreignKey: "empresa_id", //Clave foránea que relaciona la identidad dominada
  })
  public personaNatural: HasOne<typeof PersonaNatural>;
}
