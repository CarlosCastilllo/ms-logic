import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';
import OperacionValidator from 'App/Validators/OperacionValidator';

export default class OperacionsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theOperacion: Operacion = await Operacion.findOrFail(params.id)
            await theOperacion.load("vehiculo")   
            await theOperacion.load("municipio")   

            return theOperacion;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Operacion.query().preload("municipio").preload("vehiculo").paginate(page, perPage)
            } else {
                return await Operacion.query().preload("municipio").preload("vehiculo")
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(OperacionValidator);
        const body = request.body();
        const theOperacion: Operacion = await Operacion.create(body);
        await theOperacion.load("vehiculo")   
        await theOperacion.load("municipio")   
        return theOperacion;
    }

    public async update({ params, request }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
        const body = request.body();
        theOperacion.date = body.date
        theOperacion.municipio_id = body.municipio_id;
        theOperacion.vehiculo_id = body.vehiculo_id;
        await theOperacion.load("vehiculo")   
        await theOperacion.load("municipio")   
        return await theOperacion.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
            response.status(204);
            return await theOperacion.delete();
    }
}
