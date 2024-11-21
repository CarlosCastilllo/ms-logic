import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PlatoRestaurante from "App/Models/PlatoRestaurante" 
import PlatoRestauranteValidator from "App/Validators/PlatoRestauranteValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class PlatoRestauranteController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePlatoRestaurante: PlatoRestaurante = await PlatoRestaurante.findOrFail(
        params.id,
      );  
      return thePlatoRestaurante;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await PlatoRestaurante.query().paginate(page, perPage);
      } else {
        return await PlatoRestaurante.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(PlatoRestauranteValidator);
    const body = request.body();
    try {
        const userResponse = await axios.get(
          `${Env.get("MS_SECURITY")}/api/users/${body.usuario_id}`,
          {
            headers: { Authorization: request.header('authorization') || "" },
          }
        );
        const email = userResponse.data.email;
        const name = userResponse.data.name;

        const notificationResponse = await axios.post(
            `${Env.get("MS_NOTIFICATION")}/new-dish`,
            {
              email: email,
              name: name,
            }
          );
      
          if (notificationResponse.data.message) {
              console.log('Email sent successfully');
          } else {
              console.log('Failed to send email');
          }

        console.log(email);
    } catch (error) {
        console.error(error);
    }
    const thePlatoRestaurante: PlatoRestaurante = await PlatoRestaurante.create(body);

    return thePlatoRestaurante;
  }

  public async update({ params, request }: HttpContextContract) {
    const thePlatoRestaurante: PlatoRestaurante = await PlatoRestaurante.findOrFail(
      params.id,
    );
    const body = request.body();
    thePlatoRestaurante.plato_id = body.plato_id;
    thePlatoRestaurante.restaurante_id = body.restaurante_id;
    return await thePlatoRestaurante.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePlatoRestaurante: PlatoRestaurante = await PlatoRestaurante.findOrFail(
      params.id,
    );
    response.status(204);
    return await thePlatoRestaurante.delete();
  }
}
