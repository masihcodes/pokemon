import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/components/db/schema.ts",
  out: "./src/components/db/migrations",
  verbose: true,
  strict: true,
  dbCredentials: { url: process.env.DATABASE_URL! }
});