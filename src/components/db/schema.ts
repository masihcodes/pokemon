import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';



export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  score: integer("score").default(0).notNull(),
  lastAchieved: timestamp("last_achieved").defaultNow().notNull()
});


export const allies = pgTable("allies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  pokemonId: integer("pokemon_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
