import { MigrationInterface, QueryRunner } from "typeorm";

export class DictFix1754036617939 implements MigrationInterface {
    name = 'DictFix1754036617939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_dict_item" ADD "dict_code" character varying(50) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "sys_dict_item"."dict_code" IS '字典编码'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "sys_dict_item"."dict_code" IS '字典编码'`);
        await queryRunner.query(`ALTER TABLE "sys_dict_item" DROP COLUMN "dict_code"`);
    }

}
