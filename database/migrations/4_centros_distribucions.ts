import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "centros_distribucions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("nombre");
      table.integer("telefono");
      table
        .integer("municipio_id")
        .unsigned()
        .references("municipios.id")
        .onDelete("CASCADE");
      table.integer("direccion_id").unsigned().references("direccions.id").onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
