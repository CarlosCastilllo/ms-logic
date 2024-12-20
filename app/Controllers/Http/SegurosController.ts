import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';

export default class SegurosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSeguro: Seguro = await Seguro.findOrFail(params.id)
            await theSeguro.load("vehiculo") 
            return theSeguro;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seguro.query().paginate(page, perPage)
            } else {
                return await Seguro.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theSeguro: Seguro = await Seguro.create(body);
        await theSeguro.load("vehiculo") 
        return theSeguro;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
        const body = request.body();
        theSeguro.costo = body.costo;
        theSeguro.asegurado = body.asegurado;
        theSeguro.fecha_expedicion = body.fecha_expedicion;
        theSeguro.fecha_vencimiento = body.fecha_vencimiento;
        theSeguro.vehiculo_id = body.vehiculo_id;
        await theSeguro.load("vehiculo") 
        return await theSeguro.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeguro: Seguro = await Seguro.findOrFail(params.id);
            response.status(204);
            return await theSeguro.delete();
    }
}
