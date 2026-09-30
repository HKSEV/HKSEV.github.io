const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "PopupSetting",
  tableName: "POPUP_SETTINGS",
  columns: {
    ID: {
      primary: true,
      type: "number"
    },
    MAX_POPUPS: {
      type: "number",
      default: 1
    }
  }
});