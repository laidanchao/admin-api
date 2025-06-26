import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDict1750930899678 implements MigrationInterface {
    name = 'AddDict1750930899678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sys_dict" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "name" character varying(50) NOT NULL, "code" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "description" character varying(255), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_20870e7cf976aa11cde42bf1aed" UNIQUE ("code"), CONSTRAINT "PK_c99797ac6e991ce88c288e0f235" PRIMARY KEY ("id")); COMMENT ON COLUMN "sys_dict"."name" IS '字典名称'; COMMENT ON COLUMN "sys_dict"."code" IS '字典编码'; COMMENT ON COLUMN "sys_dict"."type" IS '字典类型'; COMMENT ON COLUMN "sys_dict"."description" IS '字典描述'; COMMENT ON COLUMN "sys_dict"."is_active" IS '是否激活'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sys_dict"`);
    }

}
