import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

// creamos una nueva instancia de DataSource con un objeto de configuración
export default new DataSource({
  type: 'postgres',
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  port: configService.get('POSTGRES_PORT'),
  host: configService.get('POSTGRES_HOST'),
  synchronize: false, //danger
  logging: true,
	// Entities to read
  entities: ['src/*/*/*.entity.ts'],
	// donde leerá las migraciones
	migrations: ['src/database/migrations/*.ts'],
	// nombre de la tabla de migraciones
	migrationsTableName: 'migrations',
});
