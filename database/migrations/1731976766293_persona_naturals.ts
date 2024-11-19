import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'persona_naturals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo_documento')
      table.integer('documento')
      table.dateTime('nacimiento')
      table.integer('usuario_id')
      table.integer('cliente_id').unsigned().references("clients.id");
      table.integer('empresa_id').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
