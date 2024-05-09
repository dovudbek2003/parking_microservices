import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715216223371 implements MigrationInterface {
    name = 'Migration1715216223371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-details" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "avatar" integer, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a5a05e86d5a08a3b149259d600" UNIQUE ("user_id"), CONSTRAINT "PK_19b6a3811b0ff3b46253d9ae2e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'owner', 'client')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "park_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-tariffs" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "tariff_id" integer NOT NULL, "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e728677d1f95127612151fb27a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user-details" ADD CONSTRAINT "FK_a5a05e86d5a08a3b149259d6002" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-tariffs" ADD CONSTRAINT "FK_eabd44350227a3387018d43c6bd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-tariffs" DROP CONSTRAINT "FK_eabd44350227a3387018d43c6bd"`);
        await queryRunner.query(`ALTER TABLE "user-details" DROP CONSTRAINT "FK_a5a05e86d5a08a3b149259d6002"`);
        await queryRunner.query(`DROP TABLE "user-tariffs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "user-details"`);
    }

}
