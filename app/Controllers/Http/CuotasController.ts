import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cuota from "App/Models/Cuota";
import CuotaValidator from "App/Validators/CuotaValidator";

export default class CuotasController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCuota: Cuota = await Cuota.findOrFail(params.id);
      return theCuota;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Cuota.query().paginate(page, perPage);
      } else {
        return await Cuota.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(CuotaValidator);
    const body = request.body();
    const theCuota: Cuota = await Cuota.create(body);
    return theCuota;
  }

  public async update({ params, request }: HttpContextContract) {
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    const body = request.body();
    theCuota.monto = body.monto;
    theCuota.intereses = body.intereses;
    //theCuota.contrato_id = body.contrato_id;
    return await theCuota.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    response.status(204);
    return await theCuota.delete();
  }
}
