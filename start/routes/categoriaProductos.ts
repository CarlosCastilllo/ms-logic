import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/categoriaProductos", "CategoriaProductosController.find");
  Route.get("/categoriaProductos/:id", "CategoriaProductosController.find");
  Route.post("/categoriaProductos", "CategoriaProductosController.create");
  Route.put("/categoriaProductos/:id", "CategoriaProductosController.update");
  Route.delete("/categoriaProductos/:id", "CategoriaProductosController.delete");
}).middleware(['security'])
