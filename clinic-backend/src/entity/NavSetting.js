const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "NavSetting",
  tableName: "NAV_SETTINGS",
  columns: {
    // 단일 설정값이므로 고정 ID(1)를 사용합니다.
    ID: {
      primary: true,
      type: "number"
    },
    LOGO_TYPE: {
      type: "varchar2",
      length: 20,
      default: "'TEXT'"
    },
    LOGO_TEXT: {
      type: "varchar2",
      length: 100,
      nullable: true
    },
    LOGO_FILE: {
      type: "varchar2",
      length: 255,
      nullable: true
    },
    // 💡 배열 데이터(메뉴 리스트)를 통째로 저장하기 위해 오라클 전용 clob 타입 사용
    MENUS: {
      type: "clob",
      nullable: true
    }
  }
});
