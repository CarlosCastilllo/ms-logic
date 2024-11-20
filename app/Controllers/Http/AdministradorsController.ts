import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Administrador from "App/Models/Administador" 
import AdministradorValidator from "App/Validators/AdministradorValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from "@adonisjs/core/build/standalone";

export default class AdministradorsController {
  public async find({ request, params }: HttpContextContract) {
    try{
    if (params.id) {
      let theAdministrador: Administrador = await Administrador.findOrFail(
        params.id,
      );
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${theAdministrador.usuario_id}`,
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
      await theAdministrador.load("servicio");
      return theAdministrador;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Administrador.query().paginate(page, perPage);
      } else {
        return await Administrador.query();
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
    await request.validate(AdministradorValidator);
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
      await request.validate(AdministradorValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

      return response.notFound({
        error:
          "Este usuario no existe",
      });
    }
    // Crear el Administrator si la validación y la verificación de usuario son exitosas
    await request.validate(AdministradorValidator);
    const theAdministrador: Administrador = await Administrador.create(body);
    await theAdministrador.load("servicio");
    return theAdministrador;
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
    const theAdministrador: Administrador = await Administrador.findOrFail(
      params.id,
    );
    const body = request.body();
    theAdministrador.usuario_id = body.usuario_id;
    theAdministrador.cuenta = body.cuenta;
    return await theAdministrador.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrador: Administrador = await Administrador.findOrFail(
      params.id,
    );
    response.status(204);
    return await theAdministrador.delete();
  }
}
