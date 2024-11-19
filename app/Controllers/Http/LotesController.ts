import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote'
import LoteValidator from 'App/Validators/LoteValidator'

export default class LotesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theLote: Lote = await Lote.findOrFail(params.id)
            await theLote.load("productos")   
            await theLote.load("dirListaOrdens")   
            await theLote.load("ruta")   
            return theLote;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Lote.query().paginate(page, perPage)
            } else {
                return await Lote.query()
            }
        }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(LoteValidator);
        const body = request.body();
        const theLote: Lote = await Lote.create(body);
        await theLote.load("productos")   
        await theLote.load("dirListaOrdens")   
        await theLote.load("ruta")   
        return theLote;
    }

    public async update({ params, request }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
        const body = request.body();
        theLote.peso = body.peso;
        theLote.rutaId = body.rutaId;
        theLote.ordenListaId = body.ordenListaId;
        await theLote.load("productos")   
        await theLote.load("dirListaOrdens")   
        await theLote.load("ruta")   
        return await theLote.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theLote: Lote = await Lote.findOrFail(params.id);
        await theLote.delete();
        return response.status(200).json({
            message: 'Lote eliminado con éxito'
        });
    }
}
