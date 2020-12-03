import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigration1606982676441 implements MigrationInterface {
    name = 'initMigration1606982676441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" character varying NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "smoothieId" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "smoothie" ("id" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, CONSTRAINT "PK_69b6cb6360ff3d4fba83a086182" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_857b848d8ca5f89e1d5dfbe2937" FOREIGN KEY ("smoothieId") REFERENCES "smoothie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "smoothie" ADD CONSTRAINT "FK_6117cd5a4fa1f8cf5d1cef64b29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smoothie" DROP CONSTRAINT "FK_6117cd5a4fa1f8cf5d1cef64b29"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_857b848d8ca5f89e1d5dfbe2937"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "smoothie"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
