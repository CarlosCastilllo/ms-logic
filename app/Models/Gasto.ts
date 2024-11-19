import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'
import Conductor from './Conductor'
import Factura from './Factura'
import Dueno from './Dueno'

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public monto : number

  @column()
  public descripcion : string

  @column()
    public servicio_id:number

  @column()
  public conductor_id:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Servicio,{
    //este es el nombre de la clave foranea
    foreignKey:'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>

  @belongsTo(() => Conductor,{
    //este es el nombre de la clave foranea
    foreignKey:'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @hasOne(() => Factura,{
    foreignKey:'gasto_id'
  })
  public factura: HasOne<typeof Factura>

  @belongsTo(() => Dueno, {
    foreignKey: "dueno_id",
  })
  public dueno: BelongsTo<typeof Dueno>;
}