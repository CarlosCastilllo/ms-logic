import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gastos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('monto')
      table.string('descripcion')
      table.integer("servicio_id").unsigned().references("servicios.id").onDelete("CASCADE")
      table.integer("conductor_id").unsigned().references("conductors.id").onDelete("CASCADE")
      table.integer("dueno_id").unsigned().references("duenos.id").onDelete("CASCADE")
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
