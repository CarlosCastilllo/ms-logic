import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Empresa from './Empresa'
import PersonaNatural from './PersonaNatural'
import Producto from './Producto'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre : string

  @column()
  public telefono : number

  @column()
  public cantidad_pedidos: number

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

  @hasOne(() => Empresa,{
    foreignKey:'cliente_id'
  })
  public empresa: HasOne<typeof Empresa>

  @hasOne(() => PersonaNatural, {
    foreignKey: "cliente_id", //Clave foránea que relaciona la identidad dominada
  })
  public personaNatural: HasOne<typeof PersonaNatural>;

  @hasMany(() => Producto,{
    foreignKey:'clienteId'
  })
  public productos: HasMany<typeof Producto>
}
