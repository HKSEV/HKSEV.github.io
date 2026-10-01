const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "EventRanking",
  tableName: "EVENT_RANKING_TB",
  columns: {
    EVENT_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    TITLE: {
      type: "varchar2",
      length: 200
    },
    PRICE: {
      type: "varchar2",
      length: 100
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
