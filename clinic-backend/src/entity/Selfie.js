const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Selfie",
  tableName: "SELFIE_TB",
  columns: {
    SELFIE_IDX: {
      primary: true,
      type: "number",
      generated: "increment"
    },
    FILE_NAME: {
      type: "varchar2",
      length: 255
    },
    LIKES: {
      type: "number",
      default: 0
    },
    VIEWS: {
      type: "number",
      default: 0
    },
    IS_ACTIVE: {
      type: "char",
      length: 1,
      default: "'Y'"
    }
  }
});
