import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DirListaOrdenValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    orden: schema.number([rules.unsigned(), rules.required()]),
    descripcion:schema.string([rules.alphaNum({
      allow: ['space', 'underscore', 'dash']
    })]),
    ruta_id: schema.number([
      rules.exists({ table: 'rutas', column: 'id' }), rules.required() 
    ]),
    direccion_id: schema.number([
      rules.exists({ table: 'direcciones', column: 'id' }), rules.required() 
    ])
  })

  public messages: CustomMessages = {}
}
