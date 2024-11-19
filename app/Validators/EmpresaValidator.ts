import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmpresaValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    tipo_empresa:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    }), rules.required()]),

    direccion_fiscal:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' })
    ]),
  })

  
  public messages: CustomMessages = {}
}
