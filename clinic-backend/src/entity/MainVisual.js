const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "MainVisual",
  tableName: "MAIN_VISUAL",
  columns: {
    ID: {
      primary: true,
      type: "number"
    },
    SLIDES: {
      type: "clob",
      nullable: true
    }
  }
});
