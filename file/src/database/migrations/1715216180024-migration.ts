import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715216180024 implements MigrationInterface {
    name = 'Migration1715216180024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "shot_credit_id" integer NOT NULL, "shot_debit_id" integer NOT NULL, "service_id" integer NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shots" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40b52561334dcee2a4421b371d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shots"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
