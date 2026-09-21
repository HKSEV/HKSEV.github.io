const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity("SITE_THEME_TB")
export class SiteTheme {
  @PrimaryGeneratedColumn({name: "THEME_IDX"})
  themeIdx: number;

  @Column({name: "PRIMARY_TONE", type: "varchar2", length: 50, default: "\"BLUE\""})
  primaryTone: string;

  // 다크모드
  @Column({name: "IS_DARK_MODE", type: "char", length: 1, default: "'N'"})
  isDarkMode: string;

  @Column({name: "UPDATED_AT", type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;
};
