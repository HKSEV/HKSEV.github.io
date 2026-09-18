// // 오라클 DB와 통신하기 위한 공식 라이브러리
// const oracledb = require("oracledb");
// .env 파일에 저장된 환경변수를 불러옴
require("dotenv").config();
require("reflect-metadata");
const { DataSource } = require("typeorm");
const Member = require("./src/entity/Member");

const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
  database: "XEPDB1",
  synchronize: false,
  //로깅 최적화 (운영환경이 아닐때만 true)
  logging: process.env.NODE_ENV !== "production",
  entities: [Member],
  extra: {
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1
  }
});

module.exports = AppDataSource;

// // 오라클 Thin 모드 사용 (클라이언트 프로그램 설치 x)
// // DB에서 데이터를 가져올 때 기본값인 배열대신 JSON 객체로 받아옴
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// // DB 연결을 시작하는 비동기 함수 선언
// async function initialize() {
//   // DB와 연결을 미리 맺어두고 재사용하는 커넥션 풀 생성(속도 빠름)
//   try {
//     await oracledb.createPool({
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       connectString: process.env.DB_CONNECTION_STRING, // DB 주소
//       poolMin: 2, // 접속자가 없어도 최소한으로 유지할 연결 개수
//       poolMax: 10, // 접속자가 많아질 때 늘릴 연결의 수
//       poolIncrement: 1 // 연결이 더 필요할 때 한번에 몇개씩 추가할지
//     });
//     console.log("Oracle 커넥션 풀이 성공적으로 생성되었습니다.");
//   } catch (err) {
//     console.error("OracleDB 연결 실패: ", err);
//   };
// };

// // 서버를 끌 때 DB 연결도 안전하게 끊어주기 위함 함수 선언
// async function close() {
//   try {
//     // 생성되어 있던 커넥션 풀을 가져와 안전하게 닫음(0=작업 즉시 중단)
//     await oracledb.getPool().close(0);
//     // 성공적으로 닫음
//     console.log("Oracle DB 커넥션 풀 종료");
//   } catch (err) {
//     console.error(err);
//   };
// };

// // 이 파일에 있는 함수들을 다른 파일에서도 쓸 수 있도록 내보냄
// module.exports = { initialize, close };