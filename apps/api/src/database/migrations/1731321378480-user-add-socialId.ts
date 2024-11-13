import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddSocialId1731321378480 implements MigrationInterface {
    name = 'UserAddSocialId1731321378480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "socialId" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "socialId"`);
    }

}
