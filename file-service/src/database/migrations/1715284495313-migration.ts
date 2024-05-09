import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715284495313 implements MigrationInterface {
    name = 'Migration1715284495313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "tariff_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "tariff_id" SET NOT NULL`);
    }

}
