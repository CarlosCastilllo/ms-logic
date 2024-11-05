import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class VehiculoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    color: schema.string([
      rules.alphaNum({
        allow: ["space"], // Solo permite espacios, sin guiones ni guiones bajos
      }),
    ]),

    placa: schema.string([
      rules.alphaNum({
        allow: ["dash"], // Solo permite guiones
      }),
    ]),

    tipo: schema.string([
      rules.alphaNum({
        allow: ["space"], // Solo permite espacios, sin guiones ni guiones bajos
      }),
    ]),
    capacidad: schema.number([rules.range(1, 9000)]),
  });

  public messages: CustomMessages = {};
}
