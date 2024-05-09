import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715283868055 implements MigrationInterface {
    name = 'Migration1715283868055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-details" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "avatar" integer, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_19b6a3811b0ff3b46253d9ae2e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-tariffs" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "tariff_id" integer NOT NULL, "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e728677d1f95127612151fb27a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'owner', 'client')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "park_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "user-tariffs"`);
        await queryRunner.query(`DROP TABLE "user-details"`);
    }

}
