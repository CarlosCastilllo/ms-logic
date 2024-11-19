import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categorias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
<<<<<<< HEAD
      table.string("nombre").notNullable();
      table.string("descripcion");
      table
        .integer("categoria_padre")
        .unsigned()
        .references("id")
        .inTable(this.tableName)
        .onDelete("CASCADE"); // Relación Reflexiva;
      table.string("detalle");
=======
      table.string('nombre'),
      table.string('descripcion')
      table.integer('categoriaPadreId').unsigned().references('categorias.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
>>>>>>> main
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
