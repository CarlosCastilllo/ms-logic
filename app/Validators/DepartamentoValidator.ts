import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartamentoValidator {
  constructor(protected ctx: HttpContextContract) {}

   
  public schema = schema.create({

    nombre:schema.string([
      rules.alphaNum({
        allow: ['space'] // Solo permite espacios, sin guiones ni guiones bajos
      })
    ]),

    habitantes:schema.number()

  })
  


  
  public messages: CustomMessages = {}
}
