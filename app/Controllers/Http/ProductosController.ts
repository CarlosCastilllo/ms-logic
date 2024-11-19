import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Producto from "App/Models/Producto" 
import ProductoValidator from "App/Validators/ProductoValidator";

export default class ProductosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theProducto: Producto = await Producto.findOrFail(
        params.id,
      );
      await theProducto.load("categoriaProducto")   
      await theProducto.load("cliente")  
      await theProducto.load("lote")  
      return theProducto;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Producto.query().paginate(page, perPage);
      } else {
        return await Producto.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(ProductoValidator);
    const body = request.body();
    const theProducto: Producto = await Producto.create(body);
    await theProducto.load("categoriaProducto")   
    await theProducto.load("cliente")  
    await theProducto.load("lote")  
    return theProducto;
  }

  public async update({ params, request }: HttpContextContract) {
    const theProducto: Producto = await Producto.findOrFail(
      params.id,
    );
    const body = request.body();
    theProducto.nombre = body.nombre;
    theProducto.descripcion = body.descripcion;
    theProducto.fechaVencimiento = body.fechaVencimiento;
    theProducto.clienteId = body.clienteId;
    theProducto.loteId = body.loteId
    await theProducto.load("categoriaProducto")   
    await theProducto.load("cliente")  
    await theProducto.load("lote")  
    return await theProducto.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theProducto: Producto = await Producto.findOrFail(
      params.id,
    );
    response.status(204);
    return await theProducto.delete();
  }
}
