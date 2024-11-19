import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    telefono: schema.string([
    rules.required(),
    rules.regex(/^[0-9-]+$/) 
  ]),
  cantidad_pedidos: schema.number([  
    rules.unsigned()
  ]),})

  public messages: CustomMessages = {}
}
