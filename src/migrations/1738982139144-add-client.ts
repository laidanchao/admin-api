import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClient1738982139144 implements MigrationInterface {
    name = 'AddClient1738982139144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "client_name" character varying NOT NULL, "username" character varying, "password" character varying, "client_type" character varying NOT NULL, "phone" character varying, "qq" character varying, "email" character varying, "address" character varying, CONSTRAINT "UQ_05a1e32d757cd708be02172cafe" UNIQUE ("client_name"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
