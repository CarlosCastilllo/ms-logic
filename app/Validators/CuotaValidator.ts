import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CuotaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    monto: schema.number([rules.unsigned(), rules.required()]),
    intereses: schema.number([rules.unsigned(), rules.required()]),
    contrato_id: schema.number([ rules.exists({ table: 'contratos', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
