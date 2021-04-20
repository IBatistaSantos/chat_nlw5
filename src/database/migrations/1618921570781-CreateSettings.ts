import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettings1618921570781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'username', type: 'varchar' },
          { name: 'chat', type: 'boolean', default: true },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('settings');
  }
}
