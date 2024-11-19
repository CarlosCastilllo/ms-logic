import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriaProductoValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({

    productoId: schema.number([
      rules.exists({ table: 'productos', column: 'id' })
    ]),
    categoriaId: schema.number([
      rules.exists({ table: 'categorias', column: 'id' })
    ])
  })

  
  public messages: CustomMessages = {}
}
