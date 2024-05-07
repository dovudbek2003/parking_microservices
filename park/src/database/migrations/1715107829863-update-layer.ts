import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLayer1715107829863 implements MigrationInterface {
    name = 'UpdateLayer1715107829863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_939b21ec3f50a78846a27f875a4"`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "layer_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_939b21ec3f50a78846a27f875a4" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_939b21ec3f50a78846a27f875a4"`);
        await queryRunner.query(`ALTER TABLE "places" ALTER COLUMN "layer_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_939b21ec3f50a78846a27f875a4" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
