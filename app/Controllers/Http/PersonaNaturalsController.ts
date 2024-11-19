import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PersonaNatural from "App/Models/PersonaNatural";
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator';

export default class PersonaNaturalsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
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
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(PersonaNaturalValidator);
        const body = request.body();
        const thePersonaNatural: PersonaNatural = await PersonaNatural.create(body);
        return thePersonaNatural;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
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
        const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
        response.status(204);
        return await thePersonaNatural.delete();
      }
}
