import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota'
import Gasto from './Gasto'

export default class Factura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column()
  public fechaHora: DateTime

  @column()
  public monto:number

  @column()
  public cuota_id: number

  @column()
  public gasto_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Cuota,{
    foreignKey: 'cuota_id'
  })
  public cuota:BelongsTo<typeof Cuota>

  @belongsTo(()=>Gasto,{
    foreignKey: 'gasto_id'
  })
  public gasto:BelongsTo<typeof Gasto>
}
