import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Operacion from "./Operacion";
import VehiculoConductor from "./VehiculoConductor";
import Ruta from "./Ruta";
import DuenoVehiculo from "./DuenoVehiculo";

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public color: string;

  @column()
  public placa: string;

  @column()
  public tipo: string;

  @column()
  public capacidad: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Operacion, {
    //este es el nombre de la clave foranea
    foreignKey: "vehiculo_id",
  })
  public operacions: HasMany<typeof Operacion>;

  @hasMany(() => VehiculoConductor,{
    //este es el nombre de la clave foranea
    foreignKey:'vehiculo_id'
  })
  public vehiculoConductors: HasMany<typeof VehiculoConductor>

  @hasMany(() => Ruta,{
    //este es el nombre de la clave foranea
    foreignKey:'vehiculo_id'
  })
  public rutas: HasMany<typeof Ruta>

  @hasMany(() => DuenoVehiculo, {
    foreignKey: 'vehiculo_id'
  })
  public duenosVehiculos: HasMany<typeof DuenoVehiculo>
}
