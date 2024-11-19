import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    precio: schema.number(),
    tipo_servicio: schema.string()
  })


  public messages: CustomMessages = {}
}
