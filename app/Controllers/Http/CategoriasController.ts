import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Categoria from "App/Models/Categoria" 
import CategoriaValidator from "App/Validators/CategoriaValidator";

export default class CategoriasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCategoria: Categoria = await Categoria.findOrFail(
        params.id,
      );
      return theCategoria;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Categoria.query().paginate(page, perPage);
      } else {
        return await Categoria.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(CategoriaValidator);
    const body = request.body();
    const theCategoria: Categoria = await Categoria.create(body);
    return theCategoria;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCategoria: Categoria = await Categoria.findOrFail(
      params.id,
    );
    const body = request.body();
    theCategoria.nombre = body.nombre;
    theCategoria.descripcion = body.descripcion;
    return await theCategoria.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCategoria: Categoria = await Categoria.findOrFail(
      params.id,
    );
    response.status(204);
    return await theCategoria.delete();
  }
}
