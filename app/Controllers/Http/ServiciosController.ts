import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Servicio from "App/Models/Servicio";
import ServicioValidator from 'App/Validators/ServicioValidator';

export default class ServiciosController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theServicio: Servicio = await Servicio.findOrFail(params.id);
          await theServicio.load("administrador") 
          await theServicio.load("gastos") 
          await theServicio.load("hotel")
          await theServicio.load("restaurante") 
          return theServicio;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Servicio.query().paginate(page, perPage);
          } else {
            return await Servicio.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(ServicioValidator);
        const body = request.body();
        const theServicio: Servicio = await Servicio.create(body);
        await theServicio.load("administrador") 
        await theServicio.load("gastos") 
        await theServicio.load("hotel")
        await theServicio.load("restaurante") 
        return theServicio;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        const body = request.body();
        theServicio.precio = body.precio;
        theServicio.tipo_servicio = body.tipo_servicio;
        theServicio.administrador_id = body.administrador_id;
        await theServicio.load("administrador") 
        await theServicio.load("gastos") 
        await theServicio.load("hotel")
        await theServicio.load("restaurante") 
        return await theServicio.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theServicio: Servicio = await Servicio.findOrFail(params.id);
        response.status(204);
        return await theServicio.delete();
      }
}
