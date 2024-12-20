import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Vehiculo from "App/Models/Vehiculo";
import VehiculoValidator from "App/Validators/VehiculoValidator";

export default class VehiculosController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
      await theVehiculo.load("operacions")
      await theVehiculo.load("vehiculoConductors")
      await theVehiculo.load("rutas")            
      await theVehiculo.load("duenosVehiculos")
      return theVehiculo;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await Vehiculo.query().paginate(page, perPage);
      } else {
        return await Vehiculo.query();
      }
    }
  }
  public async create({ request }: HttpContextContract) {
    await request.validate(VehiculoValidator);
    const body = request.body();
    const theVehiculo: Vehiculo = await Vehiculo.create(body);
    await theVehiculo.load("operacions")
    await theVehiculo.load("vehiculoConductors")
    await theVehiculo.load("rutas")            
    await theVehiculo.load("duenosVehiculos")
    return theVehiculo;
  }

  public async update({ params, request }: HttpContextContract) {
    const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
    const body = request.body();
    theVehiculo.color = body.color;
    theVehiculo.placa = body.placa;
    theVehiculo.tipo = body.tipo;
    theVehiculo.capacidad = body.capacidad;
    await theVehiculo.load("operacions")
    await theVehiculo.load("vehiculoConductors")
    await theVehiculo.load("rutas")            
    await theVehiculo.load("duenosVehiculos")
    return await theVehiculo.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
    response.status(204);
    return await theVehiculo.delete();
  }
}
