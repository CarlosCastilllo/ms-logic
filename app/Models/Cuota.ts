import { DateTime } from 'luxon'
import { BaseModel, /*BelongsTo, belongsTo,*/ column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'

export default class Cuota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public monto:number

  @column()
  public intereses:number

  @column()
  public contrato_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*
  @belongsTo(() => Contrato, {
    //este es el nombre de la clave foranea
    foreignKey: "contrato_id",
  })
  public departamento: BelongsTo<typeof Contrato>;
  */

  @hasOne(() => Factura,{
    foreignKey:'cuota_id'
  })
  public facrura: HasOne<typeof Factura>
}
