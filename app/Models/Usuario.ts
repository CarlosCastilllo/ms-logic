import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Administrador from "./Administador";

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string

  @column()
  public correo:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => Administrador)
  public administrador: HasOne<typeof Administrador>
}
