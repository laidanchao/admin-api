import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738921695982 implements MigrationInterface {
    name = 'Init1738921695982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sys_menu" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "parent_id" integer, "name" character varying NOT NULL, "path" character varying, "type" character varying NOT NULL, "icon" character varying, "sort" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_8b22e66a03950819c40639e58f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sys_role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "name" character varying(50) NOT NULL, "code" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_223de54d6badbe43a5490450c30" UNIQUE ("name"), CONSTRAINT "UQ_cf51756dc07761fea6b351e0615" UNIQUE ("code"), CONSTRAINT "PK_12875ba0686cf845f353704dc7b" PRIMARY KEY ("id")); COMMENT ON COLUMN "sys_role"."code" IS '角色编号'; COMMENT ON COLUMN "sys_role"."description" IS '角色描述'`);
        await queryRunner.query(`CREATE TABLE "sys_dept" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "name" character varying NOT NULL, "mpath" character varying DEFAULT '', "parent_id" integer, CONSTRAINT "PK_bcff95950c9e1012cf91f2d3134" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sys_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying NOT NULL, "update_by" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "user_no" character varying NOT NULL, "nickname" character varying, "avatar" character varying, "qq" character varying, "email" character varying, "phone" character varying, "status" character varying DEFAULT 'NORMAL', "dept_id" integer, CONSTRAINT "UQ_9e7164b2f1ea1348bc0eb0a7da4" UNIQUE ("username"), CONSTRAINT "UQ_da2a5e57fd930ed8ab7b64d00f2" UNIQUE ("user_no"), CONSTRAINT "PK_b286272b5d723fa76dca97a159e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sys_role_menus" ("role_id" integer NOT NULL, "menu_id" integer NOT NULL, CONSTRAINT "PK_9eac9bab0f67d718d7e23685c81" PRIMARY KEY ("role_id", "menu_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35ce749b04d57e226d059e0f63" ON "sys_role_menus" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b95fdc95b329d66c18f5baed6" ON "sys_role_menus" ("menu_id") `);
        await queryRunner.query(`CREATE TABLE "sys_user_roles" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_a86802699e6dfa8e45f2219cb39" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_96311d970191a044ec048011f4" ON "sys_user_roles" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d61c5b3f76a3419d93a421669" ON "sys_user_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "sys_dept" ADD CONSTRAINT "FK_92dad1cb42d3b62bc9f2e8e58ba" FOREIGN KEY ("parent_id") REFERENCES "sys_dept"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_user" ADD CONSTRAINT "FK_96bde34263e2ae3b46f011124ac" FOREIGN KEY ("dept_id") REFERENCES "sys_dept"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_role_menus" ADD CONSTRAINT "FK_35ce749b04d57e226d059e0f633" FOREIGN KEY ("role_id") REFERENCES "sys_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sys_role_menus" ADD CONSTRAINT "FK_2b95fdc95b329d66c18f5baed6d" FOREIGN KEY ("menu_id") REFERENCES "sys_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sys_user_roles" ADD CONSTRAINT "FK_96311d970191a044ec048011f44" FOREIGN KEY ("user_id") REFERENCES "sys_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sys_user_roles" ADD CONSTRAINT "FK_6d61c5b3f76a3419d93a4216695" FOREIGN KEY ("role_id") REFERENCES "sys_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_user_roles" DROP CONSTRAINT "FK_6d61c5b3f76a3419d93a4216695"`);
        await queryRunner.query(`ALTER TABLE "sys_user_roles" DROP CONSTRAINT "FK_96311d970191a044ec048011f44"`);
        await queryRunner.query(`ALTER TABLE "sys_role_menus" DROP CONSTRAINT "FK_2b95fdc95b329d66c18f5baed6d"`);
        await queryRunner.query(`ALTER TABLE "sys_role_menus" DROP CONSTRAINT "FK_35ce749b04d57e226d059e0f633"`);
        await queryRunner.query(`ALTER TABLE "sys_user" DROP CONSTRAINT "FK_96bde34263e2ae3b46f011124ac"`);
        await queryRunner.query(`ALTER TABLE "sys_dept" DROP CONSTRAINT "FK_92dad1cb42d3b62bc9f2e8e58ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d61c5b3f76a3419d93a421669"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96311d970191a044ec048011f4"`);
        await queryRunner.query(`DROP TABLE "sys_user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b95fdc95b329d66c18f5baed6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35ce749b04d57e226d059e0f63"`);
        await queryRunner.query(`DROP TABLE "sys_role_menus"`);
        await queryRunner.query(`DROP TABLE "sys_user"`);
        await queryRunner.query(`DROP TABLE "sys_dept"`);
        await queryRunner.query(`DROP TABLE "sys_role"`);
        await queryRunner.query(`DROP TABLE "sys_menu"`);
    }

}
