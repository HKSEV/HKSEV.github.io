const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Consult",
  tableName: "CONSULTS",
  columns: {
    ID: {
      primary: true,
      type: "number",
      generated: true
    },
    NAME: {
      type: "varchar2",
      length: 50,
      nullable: false
    },
    PHONE: {
      type: "varchar2",
      length: 20,
      nullable: false
    },
    PASSWORD: {
      type: "varchar2",
      length: 255,
      nullable: false
    },
    USER_ID: {
      type: "varchar2",
      length: 50,
      nullable: false
    },
    DEPARTMENT: {
      type: "varchar2",
      length: 50,
      nullable: false
    },
    TITLE: {
      type: "varchar2",
      length: 200,
      nullable: false
    },
    CONTENT: {
      type: "clob",
      nullable: false
    },
    STATUS: {
      type: "varchar2",
      length: 20,
      default: "'대기중'"
    },
    CREATED_AT: {
      type: "timestamp",
      createDate: true
    }
  }
});
