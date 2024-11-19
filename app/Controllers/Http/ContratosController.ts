import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';

export default class ContratoesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theContrato: Contrato = await Contrato.findOrFail(params.id)
            await theContrato.load("cliente");
            await theContrato.load("cuotas");
            await theContrato.load("rutas");
            return theContrato;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contrato.query().paginate(page, perPage)
            } else {
                return await Contrato.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theContrato: Contrato = await Contrato.create(body);
        await theContrato.load("cliente");
        await theContrato.load("cuotas");
        await theContrato.load("rutas");
        return theContrato;
    }

    public async update({ params, request }: HttpContextContract) {
        const theContrato: Contrato = await Contrato.findOrFail(params.id);
        const body = request.body();
        theContrato.fecha_inicio = body.fecha_inicio;
        theContrato.fecha_fin = body.fecha_fin;
        theContrato.cliente_id = body.cliente_id;
        await theContrato.load("cliente");
        await theContrato.load("cuotas");
        await theContrato.load("rutas");
        return await theContrato.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theContrato: Contrato = await Contrato.findOrFail(params.id);
            response.status(204);
            return await theContrato.delete();
    }

}
