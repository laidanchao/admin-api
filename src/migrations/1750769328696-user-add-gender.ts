import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddGender1750769328696 implements MigrationInterface {
    name = 'UserAddGender1750769328696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            -- 1. 添加允许为空的字段
            ALTER TABLE sys_user ADD COLUMN gender varchar(10);
            
            -- 2. 更新现有行，为新字段设置值
            UPDATE sys_user SET gender = 'MALE' WHERE gender IS NULL;
            
            -- 3. 修改字段为非空
            ALTER TABLE sys_user ALTER COLUMN gender SET NOT NULL;
        `)
        await queryRunner.query(`ALTER TABLE "sys_menu" ADD CONSTRAINT "FK_7cef4adcf9b01b2c6f14d52b0f3" FOREIGN KEY ("parent_id") REFERENCES "sys_menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_menu" DROP CONSTRAINT "FK_7cef4adcf9b01b2c6f14d52b0f3"`);
        await queryRunner.query(`ALTER TABLE "sys_user" DROP COLUMN "gender"`);
    }

}
