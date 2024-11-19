import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonaNaturalValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    documento: schema.string([
      rules.regex(/^[0-9]+$/), 
      rules.required()
    ]),
    tipo_documento: schema.string([
      rules.required()
    ]),
    nacimiento: schema.date({
      format: 'yyyy-MM-dd'
    }, [
      rules.required() 
    ]),
    cliente_id: schema.number([
      rules.exists({ table: 'clientes', column: 'id' }), rules.required() 
    ]),
    empresa_id: schema.number([
      rules.exists({ table: 'empresas', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
