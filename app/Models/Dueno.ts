import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'
import Gasto from './Gasto'
import DuenoVehiculo from './DuenoVehiculo'

export default class Dueno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string
  
  @column()
  public telefono: string

  @column()
  public fecha_nacimiento: Date

  @column()
  public conductor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @hasMany(() => Gasto,{
    //este es el nombre de la clave foranea
    foreignKey:'dueno_id'
  })
  public gastos: HasMany<typeof Gasto>

  @hasMany(() => DuenoVehiculo, {
    foreignKey: 'dueno_id'
  })
  public duenosVehiculos: HasMany<typeof DuenoVehiculo>
}
