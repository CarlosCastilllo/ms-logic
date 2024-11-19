import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import DirListaOrden from "App/Models/DirListaOrden";
import DirListaOrdenValidator from 'App/Validators/DirListaOrdenValidator';

export default class DirListaOrdensController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
          await theDirListaOrden.load('ruta')
          await theDirListaOrden.load('direccion')
          await theDirListaOrden.load('lote')
          return theDirListaOrden;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await DirListaOrden.query().paginate(page, perPage);
          } else {
            return await DirListaOrden.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(DirListaOrdenValidator);
        const body = request.body();
        const theDirListaOrden: DirListaOrden = await DirListaOrden.create(body);
        await theDirListaOrden.load('ruta')
        await theDirListaOrden.load('direccion')
        await theDirListaOrden.load('lote')
        return theDirListaOrden;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
        const body = request.body();
        theDirListaOrden.orden= body.orden;
        theDirListaOrden.descripcion = body.descripcion;
        theDirListaOrden.ruta_id= body.ruta_id;
        theDirListaOrden.direccion_id= body.direccion_id;
        await theDirListaOrden.load('ruta')
        await theDirListaOrden.load('direccion')
        await theDirListaOrden.load('lote')
        return await theDirListaOrden.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
        response.status(204);
        return await theDirListaOrden.delete();
      }
}
