import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1606853836619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "user" (
                "id" uuid NOT NULL, 
                "firstName" character varying NOT NULL, 
                "lastName" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                CONSTRAINT "PK_User_Id" PRIMARY KEY ("id")
            )`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);

    }

}
