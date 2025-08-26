import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrder1754569814052 implements MigrationInterface {
  name = 'AddOrder1754569814052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "oms_order" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "order_no" character varying(50) NOT NULL, "order_type" character varying NOT NULL, "client_id" integer NOT NULL, "saler_id" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'CREATED', "pay_status" character varying NOT NULL DEFAULT 'NOT_PAID', "last_paid_at" TIMESTAMP, CONSTRAINT "UQ_6d85f96681be01d253e8a268f2d" UNIQUE ("order_no"), CONSTRAINT "PK_941d5ceeabc7ca05f9df1677b3a" PRIMARY KEY ("id")); COMMENT ON COLUMN "oms_order"."order_no" IS '订单号'; COMMENT ON COLUMN "oms_order"."order_type" IS '订单类型'; COMMENT ON COLUMN "oms_order"."client_id" IS '客户id'; COMMENT ON COLUMN "oms_order"."saler_id" IS '归属销售员id'; COMMENT ON COLUMN "oms_order"."status" IS '订单状态'; COMMENT ON COLUMN "oms_order"."pay_status" IS '订单支付状态'; COMMENT ON COLUMN "oms_order"."last_paid_at" IS '最后一次支付时间'`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" ADD CONSTRAINT "FK_fc031afc14f874db6a12014881d" FOREIGN KEY ("saler_id") REFERENCES "sys_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oms_order" ADD CONSTRAINT "FK_43d1d31abe278b4b5c8db1bbb14" FOREIGN KEY ("client_id") REFERENCES "crm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oms_order" ADD CONSTRAINT "FK_a68f1f75bb1306416134596f660" FOREIGN KEY ("saler_id") REFERENCES "sys_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oms_order" DROP CONSTRAINT "FK_a68f1f75bb1306416134596f660"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oms_order" DROP CONSTRAINT "FK_43d1d31abe278b4b5c8db1bbb14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crm_client" DROP CONSTRAINT "FK_fc031afc14f874db6a12014881d"`,
    );
    await queryRunner.query(`DROP TABLE "oms_order"`);
  }
}
