const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "FooterSetting",
  tableName: "FOOTER_SETTINGS",
  columns: {
    ID: {
      primary: true,
      type: "number"
    },
    NAME: {
      type: "varchar2",
      length: 100,
      nullable: false
    },
    ADDRESS: {
      type: "varchar2",
      length: 255,
      nullable: false
    },
    CLINIC_NAME: {
      type: "varchar2",
      length: 100,
      nullable: false
    },
    PHONE: {
      type: "varchar2",
      length: 50,
      nullable: false
    },
    EMAIL: {
      type: "varchar2",
      length: 100,
      nullable: false
    },
    LOCATION_URL: {
      type: "varchar2",
      length: 255,
      nullable: false
    },
    SCHEDULES: {
      type: "simple-json",
      nullable: false
    },
    FAMILY_SITES: {
      type: "simple-json",
      nullable: false
    }
  }
});
