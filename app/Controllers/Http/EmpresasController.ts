import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa';
import EmpresaValidator from 'App/Validators/EmpresaValidator';

export default class EmpresasController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theEmpresa: Empresa = await Empresa.findOrFail(params.id);
          await theEmpresa.load("cliente");
          await theEmpresa.load("personaNatural");
          return theEmpresa;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Empresa.query().paginate(page, perPage);
          } else {
            return await Empresa.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(EmpresaValidator);
        const body = request.body();
        const theEmpresa: Empresa = await Empresa.create(body);
        await theEmpresa.load("cliente");
        await theEmpresa.load("personaNatural");
        return theEmpresa;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        const body = request.body();
        theEmpresa.tipo_empresa = body.tipo_empresa;
        theEmpresa.direccion_fiscal = body.direccion_fiscal;
        theEmpresa.cliente_id = body.cliente_id;
        await theEmpresa.load("cliente");
        await theEmpresa.load("personaNatural");
        return await theEmpresa.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        response.status(204);
        return await theEmpresa.delete();
      }
}
