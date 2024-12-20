import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Municipio from "App/Models/Municipio";
import MunicipioValidator from "App/Validators/MunicipioValidator";

export default class MunicipiosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theMunicipio: Municipio = await Municipio.findOrFail(params.id);
      await theMunicipio.load("departamento")   
      await theMunicipio.load("operacions")   
      await theMunicipio.load("direccions")   
      await theMunicipio.load("centrosDistribucion") 
      return theMunicipio;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Municipio.query().paginate(page, perPage);
      } else {
        return await Municipio.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(MunicipioValidator);
    const body = request.body();
    const theMunicipio: Municipio = await Municipio.create(body);
    await theMunicipio.load("departamento")   
    await theMunicipio.load("operacions")   
    await theMunicipio.load("direccions")   
    await theMunicipio.load("centrosDistribucion") 
    return theMunicipio;
  }

  public async update({ params, request }: HttpContextContract) {
    const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
    const body = request.body();
    theMunicipio.nombre = body.nombre;
    theMunicipio.habitantes = body.habitantes;
    theMunicipio.departamento_id = body.departamento_id;
    await theMunicipio.load("departamento")   
    await theMunicipio.load("operacions")   
    await theMunicipio.load("direccions")   
    await theMunicipio.load("centrosDistribucion") 
    return await theMunicipio.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMunicipio: Municipio = await Municipio.findOrFail(params.id);
    response.status(204);
    return await theMunicipio.delete();
  }
}
