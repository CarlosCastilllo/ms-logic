import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HotelValidator {
  constructor(protected ctx: HttpContextContract) {}

   
  public schema = schema.create({

    estrellas: schema.number([
      rules.unsigned(),
      rules.required(),
      rules.range(0, 5),
    ]),
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    direccion:schema.string([rules.alphaNum({
      allow: ['space', 'dash', 'underscore']
    }), rules.required()]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ])
  })

 
  public messages: CustomMessages = {}
}
