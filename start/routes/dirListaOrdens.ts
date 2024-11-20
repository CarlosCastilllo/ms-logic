import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/dirListaOrdens", "DirListaOrdensController.find");
    Route.get("/dirListaOrdens/:id", "DirListaOrdensController.find");
    Route.post("/dirListaOrdens", "DirListaOrdensController.create");
    Route.put("/dirListaOrdens/:id", "DirListaOrdensController.update");
    Route.delete("/dirListaOrdens/:id", "DirListaOrdensController.delete");
}).middleware(['security'])