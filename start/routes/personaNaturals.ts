import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/personaNaturals", "PersonaNaturalsController.find");
  Route.get("/personaNaturals/:id", "PersonaNaturalsController.find");
  Route.post("/personaNaturals", "PersonaNaturalsController.create");
  Route.put("/personaNaturals/:id", "PersonaNaturalsController.update");
  Route.delete("/personaNaturals/:id", "PersonaNaturalsController.delete");
}).middleware(['security'])