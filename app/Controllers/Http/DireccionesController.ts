import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Direccion from "App/Models/Direccion";

export default class DireccionesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theDireccion: Direccion = await Direccion.findOrFail(params.id);
      await theDireccion.load("centrosDistribucion");
      await theDireccion.load("municipio");
      await theDireccion.load("dirListaOrden");

      return theDireccion;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Direccion.query().paginate(page, perPage);
      } else {
        return await Direccion.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theDireccion: Direccion = await Direccion.create(body);
    await theDireccion.load("centrosDistribucion");
    await theDireccion.load("municipio");
    await theDireccion.load("dirListaOrden");
    return theDireccion;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDireccion: Direccion = await Direccion.findOrFail(params.id);
    const body = request.body();
    theDireccion.carrera = body.nombre;
    theDireccion.calle = body.calle;
    theDireccion.barrio = body.barrio;
    theDireccion.centrosDistribucion_id = body.centrosDistribucion_id;
    theDireccion.municipio_id = body.municipio_id;
    await theDireccion.save();
    await theDireccion.load('centrosDistribucion')
    await theDireccion.load('municipio')
    await theDireccion.load('dirListaOrden')
    return theDireccion;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDireccion: Direccion = await Direccion.findOrFail(params.id);
    response.status(204);
    return await theDireccion.delete();
  }
}
