import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministradorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    //En la cuenta del administrador solo se permiten caracteres alfanuméricos
    cuenta: schema.number([
    ])
  })

  public messages: CustomMessages = {}
}
