import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";

export default class ConductoresController {public async find({ request, params }: HttpContextContract) {
    try{
    if (params.id) {
      let theConductor: Conductor = await Conductor.findOrFail(
        params.id,
      );
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${theConductor.usuario_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception(
          "No se encontró información de usuario en el microservicio",
          404
        );
      }
      await theConductor.load("dueno");
      await theConductor.load("turnos");
      await theConductor.load("gastos");
      await theConductor.load("vehiculoConductors");
      return theConductor;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Conductor.query().paginate(page, perPage);
      } else {
        return await Conductor.query();
      }
    }
  }catch(error){
    throw new Exception(
      error.message || "Error al procesar la solicitud",
      error.status || 500
    );
  }
  }
  public async create({ request,response }: HttpContextContract) {
    await request.validate(ConductorValidator);
    try{
    const body = request.body();
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );

    // Verificar si no se encontró información del usuario en el microservicio
    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      await request.validate(ConductorValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

      return response.notFound({
        error:
          "Este usuario no existe",
      });
    }
    // Crear el Administrator si la validación y la verificación de usuario son exitosas
    await request.validate(ConductorValidator);
    const theConductor: Conductor = await Conductor.create(body);
    await theConductor.load("dueno");
    await theConductor.load("turnos");
    await theConductor.load("gastos");
    await theConductor.load("vehiculoConductors");
    return theConductor;
  }catch (error){
    if (error.messages) {
      return response.badRequest({ errors: error.messages.errors });
    }
    throw new Exception(
      error.message || "Error al procesar la solicitud",
      error.status || 500
    );
  }
  }

  public async update({ params, request }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(
      params.id,
    );
    const body = request.body();
    theConductor.telefono = body.telefono;
    theConductor.num_licencia = body.num_licencia;
    theConductor.vencimiento = body.vencimiento;
    theConductor.usuario_id = body.usuario_id;
    await theConductor.load("dueno");
    await theConductor.load("turnos");
    await theConductor.load("gastos");
    await theConductor.load("vehiculoConductors");
    return await theConductor.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(
      params.id,
    );
    response.status(204);
    return await theConductor.delete();
  }
}
