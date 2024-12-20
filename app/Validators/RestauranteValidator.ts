import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestauranteValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    nombre:schema.string([rules.alphaNum({
      allow: ['space']
    }), rules.required()]),
    estrellas: schema.number([
      rules.unsigned(),
      rules.required(),
      rules.range(0, 5),
    ]),
    servicio_id: schema.number([
      rules.exists({ table: 'servicios', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
