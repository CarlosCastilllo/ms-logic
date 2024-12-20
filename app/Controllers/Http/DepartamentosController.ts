import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Departamento from "App/Models/Departamento";
import DepartamentoValidator from "App/Validators/DepartamentoValidator";

export default class DepartamentosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theDepartamento: Departamento = await Departamento.findOrFail(
        params.id,
      );
      await theDepartamento.load("municipios");
      return theDepartamento;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Departamento.query().paginate(page, perPage);
      } else {
        return await Departamento.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(DepartamentoValidator);
    const body = request.body();
    const theDepartamento: Departamento = await Departamento.create(body);
    await theDepartamento.load("municipios");
    return theDepartamento;
  }

  public async update({ params, request }: HttpContextContract) {
    const theDepartamento: Departamento = await Departamento.findOrFail(
      params.id,
    );
    const body = request.body();
    theDepartamento.nombre = body.nombre;
    theDepartamento.habitantes = body.habitantes;
    await theDepartamento.load("municipios");
    return await theDepartamento.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDepartamento: Departamento = await Departamento.findOrFail(
      params.id,
    );
    response.status(204);
    return await theDepartamento.delete();
  }
}
