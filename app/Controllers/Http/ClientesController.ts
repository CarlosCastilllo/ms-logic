import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import ClienteValidator from 'App/Validators/ClienteValidator';
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from '@adonisjs/core/build/standalone';

export default class ClientesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theCliente: Cliente = await Cliente.findOrFail(params.id);
          await theCliente.load('personaNatural')
          await theCliente.load('empresa')
          await theCliente.load('contratos')
          const userResponse = await axios.get(
              `${Env.get("MS_SECURITY")}/users/${theCliente.usuario_id}`,
              {
                  headers: { Authorization: request.headers().authorization || "" },
              }
          );
          if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
              throw new Exception(
                  "No se encontró información del usuario en el sistema",
                  404
              );
          } 
          return theCliente;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Cliente.query().paginate(page, perPage);
          } else {
            return await Cliente.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(ClienteValidator);
        const body = request.body();
        const theClientee: Cliente = await Cliente.create(body);
        return theClientee;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theClientee: Cliente = await Cliente.findOrFail(params.id);
        const body = request.body();
        theClientee.nombre = body.nombre;
        theClientee.telefono = body.telefono;
        theClientee.cantidad_pedidos = body.cantidad_pedidos;
        theClientee.usuario_id = body.usuario_id
        return await theClientee.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theClientee: Cliente = await Cliente.findOrFail(params.id);
        response.status(204);
        return await theClientee.delete();
      }
}
