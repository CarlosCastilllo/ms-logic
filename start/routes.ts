/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

import "./routes/departamentos";
import "./routes/usuarios";
import "./routes/municipios";
import "./routes/vehiculos";
import "./routes/operacions";
import "./routes/administrador";
import "./routes/servicio";
import "./routes/direcciones";
import "./routes/centrosDistribucion";
import "./routes/categorias";
import "./routes/seguros";
import "./routes/cuotas";
import "./routes/facturas";
import "./routes/conductores";
import "./routes/turnos";
import "./routes/vehiculoConductors";
import "./routes/gastos";
import "./routes/hotels";
import "./routes/restaurantes";
import "./routes/clientes";
import "./routes/rutas";
import "./routes/empresas";
import "./routes/personaNaturals";
import "./routes/lotes"