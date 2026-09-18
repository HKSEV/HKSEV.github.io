const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name:"Member",
  tableName:"MEMBER_TB",
  columns:{
    USER_IDX:
    {
      primary: true, 
      type: "number",
      generated: "increment",             
    },

    USER_NAME:
    {
      type: "varchar2", 
      length: 50, 
      unique: true,
      nullable: false,            
    },

    USER_ID:
    {
      type: "varchar2", 
      length: 50, 
      unique: true,
      nullable: false,            
    },

    USER_PW:
    {
      type: "varchar2", 
      length: 100,
      nullable: false,            
    },

    EMAIL:
    {
      type: "varchar2",
      length: 100,
      nullable: false,
      unique: true,         
    },

    PHONE:
    {
      type: "varchar2", 
      length: 20, 
      nullable: false,             
    },

    RESIDENT_NUM:
    {
      type: "varchar2",
      length: 255,
      nullable: false,
    },

    ZIPCODE:
    {
      type: "varchar2",
      length: 10,
      nullable: true,//우편번호는 (다음주소 API연동용)
    },

    ADDRESS1:
    {
      type: "varchar2",
      length: 200,
      nullable: true,
    },

    ADDRESS2:
    {
      type: "varchar2",
      length: 200,
      nullable: true,
    },

    IS_SNS_AGREED:
    {
      type: "char",
      length: 1,
      default: "N",
      nullable: false,       
    },

    GENDER:
    {
      type: "varchar2",
      length: 10,
      nullable: true,        
    },
    
    REG_DATE:
    {
      type: "date",
      createDate: true,        
    },

    IS_ADMIN:
    {
      type: "number",
      default: 0,
      nullable:false,
    }
  }
});