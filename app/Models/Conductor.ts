import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Turno from './Turno'
import VehiculoConductor from './VehiculoConductor'
import Gasto from './Gasto'
import Dueno from './Dueno'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public telefono: number

  @column()
  public num_licencia: number

  @column()
  public vencimiento: Date

  @column()
  public usuario_id: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Dueno,{
    foreignKey:'conductor_id'
  })
  public dueño: HasOne<typeof Dueno>

  @hasMany(() => Turno,{
    foreignKey:'conductor_id'
  })
  public turno: HasMany<typeof Turno>

  @hasMany(() => VehiculoConductor,{
    //este es el nombre de la clave foranea
    foreignKey:'conductor_id'
  })
  public vehiculoConductors: HasMany<typeof VehiculoConductor>

  @hasMany(() => Gasto,{
    //este es el nombre de la clave foranea
    foreignKey:'conductor_id'
  })
  public Gastos: HasMany<typeof Gasto>

  /*@hasOne(() => Usuario,{
    foreignKey:'usuario_id'
  })
  public usuario: HasOne<typeof Usuario>*/
}
