import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generate1755223695530 implements MigrationInterface {
  name = 'Generate1755223695530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD CONSTRAINT "UQ_b6d7b7d54e88738e282f4e080a4" UNIQUE ("phone")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP CONSTRAINT "UQ_b6d7b7d54e88738e282f4e080a4"`,
    );
  }
}
