import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameClient1747993621342 implements MigrationInterface {
    name = 'RenameClient1747993621342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table "client" rename to "crm_client"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table "crm_client" rename to "client"`);
    }

}
