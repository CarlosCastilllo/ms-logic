import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Ruta from "App/Models/Ruta";

export default class RutasController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRuta: Ruta = await Ruta.findOrFail(params.id)
            await theRuta.load("lotes") 
            await theRuta.load("dirListaOrden") 
            await theRuta.load("contrato") 
            await theRuta.load("vehiculo") 
            return theRuta;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Ruta.query().preload("contrato").preload("vehiculo").paginate(page, perPage)
            } else {
                return await Ruta.query().preload("contrato").preload("vehiculo")
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRuta: Ruta = await Ruta.create(body);
        await theRuta.load("lotes") 
        await theRuta.load("dirListaOrden") 
        await theRuta.load("contrato") 
        await theRuta.load("vehiculo") 
        return theRuta;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRuta: Ruta = await Ruta.findOrFail(params.id);
        const body = request.body();
        theRuta.inicio = body.inicio
        theRuta.destino = body.destino
        theRuta.distancia = body.distancia
        theRuta.entrega_estimada = body.entrega_estimada;
        theRuta.contrato_id = body.contrato_id;
        theRuta.vehiculo_id = body.vehiculo_id;
        await theRuta.load("lotes") 
        await theRuta.load("dirListaOrden") 
        await theRuta.load("contrato") 
        await theRuta.load("vehiculo") 
        return await theRuta.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRuta: Ruta = await Ruta.findOrFail(params.id);
            response.status(204);
            return await theRuta.delete();
    }
}
