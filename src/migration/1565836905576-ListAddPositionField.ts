import {MigrationInterface, QueryRunner} from "typeorm";

export class ListAddPositionField1565836905576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "list" ADD "position" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "position"`);
    }

}
