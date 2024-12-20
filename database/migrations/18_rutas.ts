import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('inicio')
      table.string('destino')
      table.double('distancia')
      table.dateTime('entrega_estimada')
      table.integer("contrato_id").unsigned().references("contratos.id").onDelete("CASCADE")
      table.integer("vehiculo_id").unsigned().references("vehiculos.id").onDelete("CASCADE")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
