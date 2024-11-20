import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'persona_naturals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo_documento')
      table.string('documento')
      table.dateTime('nacimiento')
      table.string("usuario_id").notNullable()
      table.integer('cliente_id').unsigned().references('clientes.id')
      table.integer('empresa_id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
