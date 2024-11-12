import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CentrosDistribucion from "App/Models/CentrosDistribucion";

export default class CentrosDistribucionController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCentrosDistribucion: CentrosDistribucion =
        await CentrosDistribucion.findOrFail(params.id);
      await theCentrosDistribucion.load("direccion");
      return theCentrosDistribucion;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await CentrosDistribucion.query().paginate(page, perPage);
      } else {
        return await CentrosDistribucion.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCentrosDistribucion: CentrosDistribucion =
      await CentrosDistribucion.create(body);
    //await theCentrosDistribucion.load("direccion")
    return theCentrosDistribucion;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCentrosDistribucion: CentrosDistribucion =
      await CentrosDistribucion.findOrFail(params.id);
    const body = request.body();
    theCentrosDistribucion.nombre = body.nombre;
    theCentrosDistribucion.telefono = body.telefono;
    theCentrosDistribucion.municipio_id = body.municipio_id;
    return await theCentrosDistribucion.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCentrosDistribucion: CentrosDistribucion =
      await CentrosDistribucion.findOrFail(params.id);
    response.status(204);
    return await theCentrosDistribucion.delete();
  }
}
