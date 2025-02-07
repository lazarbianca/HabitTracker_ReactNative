import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./app/db/schema.ts",
  out: "./app/drizzle",
  dbCredentials: {
    url: "sqlite.db",
  },
});
