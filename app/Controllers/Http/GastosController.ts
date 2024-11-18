import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto';

export default class GastosController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGasto: Gasto = await Gasto.findOrFail(params.id)
            return theGasto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Gasto.query().preload("servicio").preload("conductor").paginate(page, perPage)
            } else {
                return await Gasto.query().preload("servicio").preload("conductor")
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theGasto: Gasto = await Gasto.create(body);
        return theGasto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGasto: Gasto = await Gasto.findOrFail(params.id);
        const body = request.body();
        theGasto.monto = body.monto
        theGasto.descripcion = body.descripcion
        theGasto.servicio_id = body.servicio_id;
        theGasto.conductor_id = body.conductor_id;
        return await theGasto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGasto: Gasto = await Gasto.findOrFail(params.id);
            response.status(204);
            return await theGasto.delete();
    }
}
