const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Popup",
  tableName: "POPUP_TB",
  columns: {
    POPUP_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    TITLE: {
      type: "varchar2",
      length: 200
    },
    LINK: {
      type: "varchar2",
      length: 500,
      nullable: true
    },
    FILE_NAME: {
      type: "varchar2",
      length: 255
    },
    START_DATE: {
      type: "varchar2",
      length: 50
    },
    END_DATE: {
      type: "varchar2",
      length: 50
    },
    USE_TODAY_CLOSE: {
      type: "char",
      length: 1,
      default: "'Y'"
    }
  }
});
