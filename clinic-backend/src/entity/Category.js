const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Category",
  tableName: "CATEGORY_TB",
  columns: {
    CATEGORY_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    TITLE: {
      type: "varchar2",
      length: 100
    },
    FILE_NAME: {
      type: "varchar2",
      length: 255
    },
    LINK: {
      type: "varchar2",
      length: 255,
      nullable: true
    },
    SORT_ORDER: {
      type: "number",
      default: 0
    }
  }
});
