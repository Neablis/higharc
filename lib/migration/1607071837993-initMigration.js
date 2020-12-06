"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMigration1607071837993 = void 0;

class initMigration1607071837993 {
  constructor() {
    this.name = "initMigration1607071837993";
  }

  async up(queryRunner) {
    await queryRunner.query("CREATE TYPE \"ingredient_unit_enum\" AS ENUM('cup', 'pinch', 'gram', 'ounce')");
    await queryRunner.query("CREATE TABLE \"ingredient\" (\"id\" character varying NOT NULL, \"name\" character varying NOT NULL, \"quantity\" integer NOT NULL, \"unit\" \"ingredient_unit_enum\" NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"smoothieId\" character varying NOT NULL, CONSTRAINT \"PK_6f1e945604a0b59f56a57570e98\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE TABLE \"smoothie\" (\"id\" character varying NOT NULL, \"name\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"userId\" character varying, CONSTRAINT \"PK_69b6cb6360ff3d4fba83a086182\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE UNIQUE INDEX \"IDX_020bc80c7437255a7c85d6bc27\" ON \"smoothie\" (\"name\") ");
    await queryRunner.query("CREATE TABLE \"user\" (\"id\" character varying NOT NULL, \"firstName\" character varying, \"lastName\" character varying, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"isAdmin\" boolean NOT NULL DEFAULT false, CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))");
    await queryRunner.query("CREATE UNIQUE INDEX \"IDX_e12875dfb3b1d92d7d7c5377e2\" ON \"user\" (\"email\") ");
    await queryRunner.query("ALTER TABLE \"ingredient\" ADD CONSTRAINT \"FK_857b848d8ca5f89e1d5dfbe2937\" FOREIGN KEY (\"smoothieId\") REFERENCES \"smoothie\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE \"smoothie\" ADD CONSTRAINT \"FK_6117cd5a4fa1f8cf5d1cef64b29\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION");
  }

  async down(queryRunner) {
    await queryRunner.query("ALTER TABLE \"smoothie\" DROP CONSTRAINT \"FK_6117cd5a4fa1f8cf5d1cef64b29\"");
    await queryRunner.query("ALTER TABLE \"ingredient\" DROP CONSTRAINT \"FK_857b848d8ca5f89e1d5dfbe2937\"");
    await queryRunner.query("DROP INDEX \"IDX_e12875dfb3b1d92d7d7c5377e2\"");
    await queryRunner.query("DROP TABLE \"user\"");
    await queryRunner.query("DROP INDEX \"IDX_020bc80c7437255a7c85d6bc27\"");
    await queryRunner.query("DROP TABLE \"smoothie\"");
    await queryRunner.query("DROP TABLE \"ingredient\"");
    await queryRunner.query("DROP TYPE \"ingredient_unit_enum\"");
  }

}

exports.initMigration1607071837993 = initMigration1607071837993;
//# sourceMappingURL=1607071837993-initMigration.js.map