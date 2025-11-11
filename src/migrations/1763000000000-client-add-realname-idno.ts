import { MigrationInterface, QueryRunner } from "typeorm";

export class ClientAddRealnameIdno1763000000000 implements MigrationInterface {
    name = 'ClientAddRealnameIdno1763000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_client" ADD "real_name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "crm_client" ADD "id_no" character varying(18)`);
        await queryRunner.query(`ALTER TABLE "crm_client" ADD CONSTRAINT "UQ_0a221ce8868a3c57a42b455d2be" UNIQUE ("id_no")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_client" DROP CONSTRAINT "UQ_0a221ce8868a3c57a42b455d2be"`);
        await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "id_no"`);
        await queryRunner.query(`ALTER TABLE "crm_client" DROP COLUMN "real_name"`);
    }

}