import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixClient1754570756859 implements MigrationInterface {
  name = 'FixClient1754570756859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD "client_stage" character varying(20)`,
    );
    await queryRunner.query(`update crm_client set client_stage='INTERESTING'`);
    await queryRunner.query(
      `ALTER TABLE "crm_client" ALTER COLUMN "client_stage" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP COLUMN "client_stage"`,
    );
  }
}
