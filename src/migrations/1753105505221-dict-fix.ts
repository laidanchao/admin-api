import { MigrationInterface, QueryRunner } from 'typeorm';

export class DictFix1753105505221 implements MigrationInterface {
  name = 'DictFix1753105505221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ALTER COLUMN "type" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sys_dict" ALTER COLUMN "type" SET NOT NULL`,
    );
  }
}
