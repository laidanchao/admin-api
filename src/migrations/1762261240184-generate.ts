import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1762261240184 implements MigrationInterface {
    name = 'Generate1762261240184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "out_feed" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "real_name" character varying(50) NOT NULL, "id_no" character varying(50), "phone" character varying(50) NOT NULL, "city" character varying(50), "service_area" character varying(50), "direction" character varying(50), "comment" character varying, "audit_status" character varying(20) NOT NULL, CONSTRAINT "PK_48ea596098e9bf8df342b753c33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "out_feed_detail" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "feed_id" integer NOT NULL, "area_code" character varying(50), "area_name" character varying(50), "location_code" character varying(50), "location_name" character varying(50), "img_key" character varying, "cover_img_key" character varying, "is_video" boolean, CONSTRAINT "PK_b84621cf36cbb818fbe6c541fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "out_feed_detail" ADD CONSTRAINT "FK_ce0b5ea246399765a3949d89490" FOREIGN KEY ("feed_id") REFERENCES "out_feed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "out_feed_detail" DROP CONSTRAINT "FK_ce0b5ea246399765a3949d89490"`);
        await queryRunner.query(`DROP TABLE "out_feed_detail"`);
        await queryRunner.query(`DROP TABLE "out_feed"`);
    }

}
