import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehiculoConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha: schema.date({
      format: 'yyyy-MM-dd'
    }),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' }), rules.required() 
    ]),
    vehiculo_id: schema.number([
      rules.exists({ table: 'vehiculos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
