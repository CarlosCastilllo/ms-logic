import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/centrosDistribucion", "CentrosDistribucionController.find");
    Route.get("/centrosDistribucion/:id", "CentrosDistribucionController.find");
    Route.post("/centrosDistribucion", "CentrosDistribucionController.create");
    Route.put("/centrosDistribucion/:id", "CentrosDistribucionController.update");
    Route.delete("/centrosDistribucion/:id", "CentrosDistribucionController.delete");
})