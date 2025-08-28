import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDictItem1754032089201 implements MigrationInterface {
  name = 'AddDictItem1754032089201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sys_dict_item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "item_name" character varying(50) NOT NULL, "item_code" character varying(50) NOT NULL, "item_desc" character varying(255), "tag_type" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_7ff86054101462087b2eea7acaf" UNIQUE ("item_code"), CONSTRAINT "PK_88f1e2a3113ea467e938dfb8af3" PRIMARY KEY ("id")); COMMENT ON COLUMN "sys_dict_item"."item_name" IS '字典项名称'; COMMENT ON COLUMN "sys_dict_item"."item_code" IS '字典项编码'; COMMENT ON COLUMN "sys_dict_item"."item_desc" IS '字典项描述'; COMMENT ON COLUMN "sys_dict_item"."tag_type" IS '标签类型（前端回显样式）'; COMMENT ON COLUMN "sys_dict_item"."is_active" IS '是否激活'`,
    );
    await queryRunner.query(`ALTER TABLE "sys_dict" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "sys_dict" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ADD "desc" character varying(255)`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "sys_dict"."desc" IS '字典描述'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "sys_dict"."desc" IS '字典描述'`,
    );
    await queryRunner.query(`ALTER TABLE "sys_dict" DROP COLUMN "desc"`);
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ADD "description" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ADD "type" character varying(50)`,
    );
    await queryRunner.query(`DROP TABLE "sys_dict_item"`);
  }
}
