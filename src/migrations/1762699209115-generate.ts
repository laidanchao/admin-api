import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1762699209115 implements MigrationInterface {
    name = 'Generate1762699209115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "out_feed" ADD "visited_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "out_feed" ADD "location" character varying`);
        await queryRunner.query(`ALTER TABLE "out_feed" ADD "self_img_key" character varying`);
        await queryRunner.query(`ALTER TABLE "out_feed" ADD "self_img_url" character varying`);
        await queryRunner.query(`ALTER TABLE "out_feed_detail" ADD "img_url" character varying`);
        await queryRunner.query(`ALTER TABLE "out_feed_detail" ADD "cover_img_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "out_feed_detail" DROP COLUMN "cover_img_url"`);
        await queryRunner.query(`ALTER TABLE "out_feed_detail" DROP COLUMN "img_url"`);
        await queryRunner.query(`ALTER TABLE "out_feed" DROP COLUMN "self_img_url"`);
        await queryRunner.query(`ALTER TABLE "out_feed" DROP COLUMN "self_img_key"`);
        await queryRunner.query(`ALTER TABLE "out_feed" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "out_feed" DROP COLUMN "visited_at"`);
    }

}
