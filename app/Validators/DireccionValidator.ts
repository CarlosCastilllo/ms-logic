import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DireccionValidator {
  constructor(protected ctx: HttpContextContract) {}

   
  public schema = schema.create({
    carrera:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    calle:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
    barrio:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),
  })

  
  public messages: CustomMessages = {}
}
