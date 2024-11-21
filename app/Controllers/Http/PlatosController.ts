import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plato from "App/Models/Plato" 
import PlatoValidator from "App/Validators/PlatoValidator";

export default class PlatoController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePlato: Plato = await Plato.findOrFail(
        params.id,
      );  
      return thePlato;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Plato.query().paginate(page, perPage);
      } else {
        return await Plato.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(PlatoValidator);
    const body = request.body();
    const thePlato: Plato = await Plato.create(body);
    return thePlato;
  }

  public async update({ params, request }: HttpContextContract) {
    const thePlato: Plato = await Plato.findOrFail(
      params.id,
    );
    const body = request.body();
    thePlato.nombre = body.nombre;
    thePlato.descripcion = body.descripcion;
    return await thePlato.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePlato: Plato = await Plato.findOrFail(
      params.id,
    );
    response.status(204);
    return await thePlato.delete();
  }
}
