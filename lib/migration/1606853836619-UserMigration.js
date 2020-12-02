"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMigration1606853836619 = void 0;

class UserMigration1606853836619 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
                "id" uuid NOT NULL, 
                "firstName" character varying NOT NULL, 
                "lastName" character varying NOT NULL, 
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "isAdmin" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_User_Id" PRIMARY KEY ("id")
            )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "user"`);
  }

}

exports.UserMigration1606853836619 = UserMigration1606853836619;
//# sourceMappingURL=1606853836619-UserMigration.js.map