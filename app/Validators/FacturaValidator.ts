import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({

    fechaHora: schema.date({
      format: 'yyyy-MM-dd HH:mm:ss'
    }, [
      rules.required() // Hace que el campo sea obligatorio
    ]),
    monto: schema.number([rules.unsigned(), rules.required()]),
    gasto_id: schema.number([
      rules.exists({ table: 'gastos', column: 'id' })
    ]),
    cuota_id: schema.number([
      rules.exists({ table: 'cuotas', column: 'id' })
    ])
  })

 
  public messages: CustomMessages = {}
}
