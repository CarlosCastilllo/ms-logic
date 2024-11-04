import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Departamento from "./Departamento";
import Operacion from "./Operacion";

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public habitantes: number;

  @column()
  public departamento_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Departamento, {
    //este es el nombre de la clave foranea
    foreignKey: "departamento_id",
  })
  public departamento: BelongsTo<typeof Departamento>;

  @hasMany(() => Operacion, {
    //este es el nombre de la clave foranea
    foreignKey: "municipio_id",
  })
  public operacions: HasMany<typeof Operacion>;
}
