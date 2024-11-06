import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
import "./routes/direcciones"
import "./routes/centrosDistribucion"