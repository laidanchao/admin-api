import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientAddSaler1754469023562 implements MigrationInterface {
  name = 'ClientAddSaler1754469023562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crm_client" ADD "saler_id" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "saler_id"`);
  }
}
