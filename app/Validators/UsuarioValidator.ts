import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    correo: schema.string([
      rules.email()
    ])
  })

  public messages: CustomMessages = {}
}
