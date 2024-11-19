import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CategoriaProducto from "App/Models/CategoriaProducto" 
import CategoriaProductoValidator from "App/Validators/CategoriaProductoValidator";

export default class CategoriaProductosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(
        params.id,
      );
      await theCategoriaProducto.load("categorias")
      await theCategoriaProducto.load("producto")
      return theCategoriaProducto;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await CategoriaProducto.query().paginate(page, perPage);
      } else {
        return await CategoriaProducto.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(CategoriaProductoValidator);
    const body = request.body();
    const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.create(body);
    await theCategoriaProducto.load("categorias")
    await theCategoriaProducto.load("producto")
    return theCategoriaProducto;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(
      params.id,
    );
    const body = request.body();
    theCategoriaProducto.productoId = body.productoId;
    theCategoriaProducto.categoriaId = body.categoriaId;
    await theCategoriaProducto.load("categorias")
    await theCategoriaProducto.load("producto")
    return await theCategoriaProducto.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(
      params.id,
    );
    response.status(204);
    return await theCategoriaProducto.delete();
  }
}
