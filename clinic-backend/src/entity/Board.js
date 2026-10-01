const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Board",
  tableName: "BOARD_TB",
  columns: {
    BOARD_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    NAME: {
      type: "varchar2",
      length: 100
    },
    BOARD_TYPE: {
      type: "varchar2",
      length: 50
    },
    READ_AUTH: {
      type: "varchar2",
      length: 50
    },
    WRITE_AUTH: {
      type: "varchar2",
      length: 50
    },
    REG_DATE: {
      type: "date",
      createDate: true
    }
  }
});
