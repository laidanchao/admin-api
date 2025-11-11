import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1762877706081 implements MigrationInterface {
    name = 'Generate1762877706081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "out_feed" ADD "client_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "out_feed" DROP COLUMN "client_id"`);
    }

}
