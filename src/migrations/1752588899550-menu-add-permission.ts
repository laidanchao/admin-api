import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuAddPermission1752588899550 implements MigrationInterface {
    name = 'MenuAddPermission1752588899550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_menu" ADD "permission" character varying(100)`);
        await queryRunner.query(`COMMENT ON COLUMN "sys_menu"."permission" IS '按钮权限'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "sys_menu"."permission" IS '按钮权限'`);
        await queryRunner.query(`ALTER TABLE "sys_menu" DROP COLUMN "permission"`);
    }

}
