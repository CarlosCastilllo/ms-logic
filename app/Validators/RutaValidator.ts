import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    puntoInicio: schema.string([
      rules.regex(/^[a-zA-Z0-9 _\-#]+$/),
      rules.required()
    ]),
    puntoFin: schema.string([
      rules.regex(/^[a-zA-Z0-9 _\-#]+$/), 
      rules.required()
    ])
  })

 
  public messages: CustomMessages = {}
}
