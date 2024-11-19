import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DuenoVehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    fecha_adquisicion: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    porcentaje_propiedad: schema.number([rules.unsigned(), rules.required()]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ]),
    dueno_id: schema.number([
      rules.exists({ table: 'duenos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
