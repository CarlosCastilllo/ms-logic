import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";

export default class UsuariosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theUsuario: Usuario = await Usuario.findOrFail(params.id);
      return theUsuario;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Usuario.query().paginate(page, perPage);
      } else {
        return await Usuario.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theUsuario: Usuario = await Usuario.create(body);
    return theUsuario;
  }

  public async update({ params, request }: HttpContextContract) {
    const theUsuario: Usuario = await Usuario.findOrFail(params.id);
    const body = request.body();
    theUsuario.nombre = body.nombre;
    theUsuario.correo = body.correo;
    return await theUsuario.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theUsuario: Usuario = await Usuario.findOrFail(params.id);
    response.status(204);
    return await theUsuario.delete();
  }
}
