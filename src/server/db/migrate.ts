import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from "@/env";

const migrationClient = postgres({
  host: env.PGHOST,
  database: env.PGDATABASE,
  username: env.PGUSER,
  password: env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${env.ENDPOINT_ID}`,
  },
  max: 1,
});

const database = drizzle(migrationClient);

await migrate(database, { migrationsFolder: 'drizzle' });

await migrationClient.end();
