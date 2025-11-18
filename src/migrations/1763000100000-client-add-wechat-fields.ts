import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientAddWechatFields1763000100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "openid" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD CONSTRAINT "UQ_0302325c0263b6e86340c741898" UNIQUE ("openid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "unionid" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "nickname" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "avatar" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "crm_client" ADD "gender" integer`);
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "wx_country" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "wx_province" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "wx_city" character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "language" character varying(20)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "language"`);
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "wx_city"`);
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP COLUMN "wx_province"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP COLUMN "wx_country"`,
    );
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "nickname"`);
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "unionid"`);
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP CONSTRAINT "UQ_0302325c0263b6e86340c741898"`,
    );
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "openid"`);
  }
}
