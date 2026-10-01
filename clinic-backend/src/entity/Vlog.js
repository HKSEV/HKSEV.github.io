const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Vlog",
  tableName: "VLOG_TB",
  columns: {
    VLOG_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    TITLE: {
      type: "varchar2",
      length: 200
    },
    VIDEO_URL: {
      type: "varchar2",
      length: 500
    },
    FILE_NAME: {
      type: "varchar2",
      length: 255
    },
    SORT_ORDER: {
      type: "number",
      default: 0
    }
  }
});
