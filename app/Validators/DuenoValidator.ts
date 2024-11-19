import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DuenoValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({

    telefono: schema.string([
      rules.required(),
      rules.regex(/^[0-9-]+$/) 
    ]),
    fecha_nacimiento: schema.date({
        format: 'yyyy-MM-dd'
      }, [
        rules.required()
      ]),
    conductor_id: schema.number([
      rules.exists({ table: 'conductores', column: 'id' })
    ])
  })
  

 
  public messages: CustomMessages = {}
}
