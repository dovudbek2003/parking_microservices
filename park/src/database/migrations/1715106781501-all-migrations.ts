import { MigrationInterface, QueryRunner } from "typeorm";

export class AllMigrations1715106781501 implements MigrationInterface {
    name = 'AllMigrations1715106781501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), "layer_id" integer, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "layers" ("id" SERIAL NOT NULL, "name" character varying, "floor" integer, "park_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_611c9a60a779f18c5e55e1f31b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "park_id" integer NOT NULL, "user_id" integer NOT NULL, "started_at" TIMESTAMP NOT NULL DEFAULT now(), "ended_at" TIMESTAMP, "price" integer, "tariff_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" integer, "image" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c0083b667f0488512b094512521" UNIQUE ("name"), CONSTRAINT "PK_035f21558c39565edbf33f03210" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tariffs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "time" integer NOT NULL, "park_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f32baf8d8b4bb0cf4d7ac97741" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_939b21ec3f50a78846a27f875a4" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "layers" ADD CONSTRAINT "FK_c9106e43cd54f02f162061b1881" FOREIGN KEY ("park_id") REFERENCES "parks"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_a92d8ce6c1d4963ad5cfb692d7b" FOREIGN KEY ("park_id") REFERENCES "parks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_82132ddb2e328cf3ef8b6e7a76d" FOREIGN KEY ("tariff_id") REFERENCES "tariffs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tariffs" ADD CONSTRAINT "FK_282af9ddb394dcc3cdf9b928693" FOREIGN KEY ("park_id") REFERENCES "parks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tariffs" DROP CONSTRAINT "FK_282af9ddb394dcc3cdf9b928693"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_82132ddb2e328cf3ef8b6e7a76d"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_a92d8ce6c1d4963ad5cfb692d7b"`);
        await queryRunner.query(`ALTER TABLE "layers" DROP CONSTRAINT "FK_c9106e43cd54f02f162061b1881"`);
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_939b21ec3f50a78846a27f875a4"`);
        await queryRunner.query(`DROP TABLE "tariffs"`);
        await queryRunner.query(`DROP TABLE "parks"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "layers"`);
        await queryRunner.query(`DROP TABLE "places"`);
    }

}
