import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DuenoVehiculo from 'App/Models/DuenoVehiculo';
import DuenoVehiculoValidator from 'App/Validators/DuenoVehiculoValidator';

export default class DuenoVehiculosController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theDuenoVehiculo: DuenoVehiculo = await DuenoVehiculo.findOrFail(
            params.id,
          );
          await theDuenoVehiculo.load("vehiculo");
          await theDuenoVehiculo.load("dueno");
          return theDuenoVehiculo;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await DuenoVehiculo.query().paginate(page, perPage);
          } else {
            return await DuenoVehiculo.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        await request.validate(DuenoVehiculoValidator);
        const body = request.body();
        const theDuenoVehiculo: DuenoVehiculo = await DuenoVehiculo.create(body);
        await theDuenoVehiculo.load("vehiculo");
        await theDuenoVehiculo.load("dueno");
        return theDuenoVehiculo;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theDuenoVehiculo: DuenoVehiculo = await DuenoVehiculo.findOrFail(
          params.id,
        );
        const body = request.body();
        theDuenoVehiculo.fecha_adquisicion= body.fecha_adquisicion;
    theDuenoVehiculo.porcentaje_propiedad = body.porcentaje_propiedad;
    theDuenoVehiculo.dueno_id= body.dueno_id;
    theDuenoVehiculo.vehiculo_id= body.vehiculo_id;
    await theDuenoVehiculo.load("vehiculo");
    await theDuenoVehiculo.load("dueno");
        return await theDuenoVehiculo.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDuenoVehiculo: DuenoVehiculo = await DuenoVehiculo.findOrFail(
          params.id,
        );
        response.status(204);
        return await theDuenoVehiculo.delete();
      }
}
