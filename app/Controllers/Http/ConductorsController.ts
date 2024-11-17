import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';

export default class ConductoresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theConductor: Conductor = await Conductor.findOrFail(params.id)
            //await theConductor.load('dueño')
            //await theConductor.load('usuario')
            return theConductor;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Conductor.query().paginate(page, perPage)
            } else {
                return await Conductor.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theConductor: Conductor = await Conductor.create(body);
        //await theConductor.load('dueño')
        //await theConductor.load('usuario')
        return theConductor;
    }

    public async update({ params, request }: HttpContextContract) {
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        const body = request.body();
        theConductor.telefono = body.telefono;
        theConductor.num_licencia = body.num_licencia;
        theConductor.vencimiento = body.vencimiento;
        theConductor.usuario_id = body.centrosDistribucion_id;
        return await theConductor.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
            response.status(204);
            return await theConductor.delete();
    }
}
