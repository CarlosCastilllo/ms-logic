import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hotel from "App/Models/Hotel";
import HotelValidator from "App/Validators/HotelValidator";

export default class HotelsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theHotel: Hotel = await Hotel.findOrFail(params.id);
          await theHotel.load("servicio")           
          return theHotel;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Hotel.query().paginate(page, perPage);
          } else {
            return await Hotel.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(HotelValidator);
        const body = request.body();
        const theHotel: Hotel = await Hotel.create(body);
        await theHotel.load("servicio")   
        return theHotel;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
        const body = request.body();
        theHotel.nombre = body.nombre;
        theHotel.estrellas = body.estrellas;
        theHotel.direccion = body.direccion;
        theHotel.servicio_id = body.servicio_id;
        await theHotel.load("servicio")   
        return await theHotel.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theHotel: Hotel = await Hotel.findOrFail(params.id);
        response.status(204);
        return await theHotel.delete();
      }
}
