import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedByCreatedBy1753102163897 implements MigrationInterface {
  name = 'UpdatedByCreatedBy1753102163897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sys_menu" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_menu" RENAME COLUMN "create_by" TO "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_role" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_role" RENAME COLUMN "create_by" TO "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dept" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dept" RENAME COLUMN "create_by" TO "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_user" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_user" RENAME COLUMN "create_by" TO "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dict" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dict" RENAME COLUMN "create_by" TO "created_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" RENAME COLUMN "update_by" TO "updated_by"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" RENAME COLUMN "create_by" TO "created_by"`,
    );

    await queryRunner.query(
      `ALTER TABLE "sys_menu" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dept" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_user" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_role" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ALTER COLUMN "updated_by" DROP NOT NULL`,
    );
  }

  public async down(): Promise<void> {}
}
