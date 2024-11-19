
import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import DuenoValidator from 'App/Validators/DuenoValidator';


export default class DuenosController {

    public async find({ request, params }: HttpContextContract) {
        try{
        if (params.id) {
          let theDueno: Dueno = await Dueno.findOrFail(
            params.id,
          );
          const userResponse = await axios.get(
            `${Env.get("MS_SECURITY")}/users/${theDueno.usuario_id}`,
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
          await theDueno.load("conductor");
          await theDueno.load("gastos");
          await theDueno.load("duenosVehiculos");
          return theDueno;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Dueno.query().paginate(page, perPage);
          } else {
            return await Dueno.query();
          }
        }}catch (error){
            throw new Exception(
                error.message || "Error al procesar la solicitud",
                error.status || 500
              );
        }
      }
      public async create({ request,response }: HttpContextContract) {
        await request.validate(DuenoValidator);
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
          await request.validate(DuenoValidator); //*cuando se llame este endpoint antes de mandar valida los datos de acuerdo a los parametros del validador
    
          return response.notFound({
            error:
              "Este usuario no existe",
          });
        }
        // Crear el Administrator si la validación y la verificación de usuario son exitosas
        await request.validate(DuenoValidator);
        const theDueno: Dueno = await Dueno.create(body);
        await theDueno.load("conductor");
        await theDueno.load("gastos");
        await theDueno.load("duenosVehiculos");
        return theDueno;
    }catch(error){
        // Si el error es de validación, devolver los mensajes de error de forma legible
        if (error.messages) {
          return response.badRequest({ errors: error.messages.errors });
        }
        // Para cualquier otro tipo de error, lanzar una excepción genérica
        throw new Exception(
          error.message || "Error al procesar la solicitud",
          error.status || 500
        );
      }
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(
          params.id,
        );
        const body = request.body();
        theDueno.usuario_id = body.usuario_id;
        theDueno.telefono = body.telefono
        theDueno.fecha_nacimiento = body.fecha_nacimiento
        theDueno.conductor_id = body.conductor_id
        await theDueno.load("conductor");
        await theDueno.load("gastos");
        await theDueno.load("duenosVehiculos");
        return await theDueno.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDueno: Dueno = await Dueno.findOrFail(
          params.id,
        );
        response.status(204);
        return await theDueno.delete();
      }

}
