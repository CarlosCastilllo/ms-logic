import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VehiculoConductor from "App/Models/VehiculoConductor";

export default class VehiculoConductorsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id)
            await theVehiculoConductor.load("vehiculo")
            await theVehiculoConductor.load("conductor")
            return theVehiculoConductor;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await VehiculoConductor.query().preload("vehiculo").preload("conductor").paginate(page, perPage)
            } else {
                return await VehiculoConductor.query().preload("vehiculo").preload("conductor")
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.create(body);
        await theVehiculoConductor.load("vehiculo")
        await theVehiculoConductor.load("conductor")
        return theVehiculoConductor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id);
        const body = request.body();
        theVehiculoConductor.fecha = body.fecha
        theVehiculoConductor.vehiculo_id = body.vehiculo_id;
        theVehiculoConductor.conductor_id = body.conductor_id;
        await theVehiculoConductor.load("vehiculo")
        await theVehiculoConductor.load("conductor")
        return await theVehiculoConductor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiculoConductor: VehiculoConductor = await VehiculoConductor.findOrFail(params.id);
            response.status(204);
            return await theVehiculoConductor.delete();
    }
}
