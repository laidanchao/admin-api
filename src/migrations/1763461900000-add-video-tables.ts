import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVideoTables1763461900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "video_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "name" character varying(50) NOT NULL, "description" character varying(200), "sort" integer NOT NULL DEFAULT '0', "enabled" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_2a5c61f32e9636ee10821e9a58d" PRIMARY KEY ("id")); COMMENT ON COLUMN "video_category"."name" IS '分类名称'; COMMENT ON COLUMN "video_category"."description" IS '分类描述'; COMMENT ON COLUMN "video_category"."sort" IS '排序权重'; COMMENT ON COLUMN "video_category"."enabled" IS '是否启用'`,
    );
    await queryRunner.query(
      `CREATE TABLE "video_history" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "client_id" integer NOT NULL, "video_id" integer NOT NULL, "position" integer NOT NULL DEFAULT '0', "is_completed" boolean NOT NULL DEFAULT false, "clientId" integer, "videoId" integer, CONSTRAINT "PK_a42e3ed96dcdff025f885914b31" PRIMARY KEY ("id")); COMMENT ON COLUMN "video_history"."client_id" IS '客户ID'; COMMENT ON COLUMN "video_history"."video_id" IS '视频ID'; COMMENT ON COLUMN "video_history"."position" IS '播放进度（秒）'; COMMENT ON COLUMN "video_history"."is_completed" IS '是否已看完'`,
    );
    await queryRunner.query(
      `CREATE TABLE "video" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "title" character varying(255) NOT NULL, "description" text, "video_url" character varying NOT NULL, "size" bigint NOT NULL DEFAULT '0', "duration" integer NOT NULL DEFAULT '0', "cover_url" character varying, "view_count" integer NOT NULL DEFAULT '0', "category_id" integer, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")); COMMENT ON COLUMN "video"."title" IS '视频标题'; COMMENT ON COLUMN "video"."description" IS '视频描述'; COMMENT ON COLUMN "video"."video_url" IS '视频URL'; COMMENT ON COLUMN "video"."size" IS '视频容量大小（字节）'; COMMENT ON COLUMN "video"."duration" IS '视频总时长（秒）'; COMMENT ON COLUMN "video"."cover_url" IS '视频封面图URL'; COMMENT ON COLUMN "video"."view_count" IS '观看次数'; COMMENT ON COLUMN "video"."category_id" IS '分类ID'`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_history" ADD CONSTRAINT "FK_295f21b0a27b9c03a34bc511120" FOREIGN KEY ("clientId") REFERENCES "crm_client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_history" ADD CONSTRAINT "FK_1198bd14c2bdb847581a7760221" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_2a5c61f32e9636ee10821e9a58d" FOREIGN KEY ("category_id") REFERENCES "video_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_2a5c61f32e9636ee10821e9a58d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_history" DROP CONSTRAINT "FK_1198bd14c2bdb847581a7760221"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video_history" DROP CONSTRAINT "FK_295f21b0a27b9c03a34bc511120"`,
    );
    await queryRunner.query(`DROP TABLE "video"`);
    await queryRunner.query(`DROP TABLE "video_history"`);
    await queryRunner.query(`DROP TABLE "video_category"`);
  }
}
