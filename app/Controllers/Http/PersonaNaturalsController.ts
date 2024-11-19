import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PersonaNatural from "App/Models/PersonaNatural";
import PersonaNaturalValidator from "App/Validators/PersonaNaturalValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class PersonaNaturalesController {
  public async find({ request, params }: HttpContextContract) {
    try {
      if (params.id) {
        let thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(
          params.id,
        );
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/users/${thePersonaNatural.usuario_id}`,
          {
            headers: { Authorization: request.headers().authorization || "" },
          },
        );
        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
          throw new Exception(
            "No se encontró información de usuario en el microservicio",
            404,
          );
        }
        await thePersonaNatural.load("empresa");
        await thePersonaNatural.load("cliente");
        return thePersonaNatural;
      } else {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
          const page = request.input("page", 1);
          const perPage = request.input("per_page", 20);
          return await PersonaNatural.query().paginate(page, perPage);
        } else {
          return await PersonaNatural.query();
        }
      }
    } catch (error) {
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }
  public async create({ request, response }: HttpContextContract) {
    await request.validate(PersonaNaturalValidator);
    try {
      const body = request.body();
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        },
      );

      // Verificar si no se encontró información del usuario en el microservicio
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        await request.validate(PersonaNaturalValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador

        return response.notFound({
          error: "Este usuario no existe",
        });
      }
      // Crear el Administrator si la validación y la verificación de usuario son exitosas
      await request.validate(PersonaNaturalValidator);
      const thePersonaNatural: PersonaNatural =
        await PersonaNatural.create(body);
      await thePersonaNatural.load("empresa");
      await thePersonaNatural.load("cliente");
      return thePersonaNatural;
    } catch (error) {
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500,
      );
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(
      params.id,
    );
    const body = request.body();
    thePersonaNatural.tipo_documento = body.tipo_documento;
    thePersonaNatural.documento = body.documento;
    thePersonaNatural.nacimiento = body.nacimiento;
    thePersonaNatural.usuario_id = body.usuario_id;
    thePersonaNatural.cliente_id = body.cliente_id;
    thePersonaNatural.empresa_id = body.empresa_id;
    return await thePersonaNatural.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(
      params.id,
    );
    response.status(204);
    return await thePersonaNatural.delete();
  }
}
