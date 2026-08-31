import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable( "profile", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  location: text('location').notNull(),
  image_url: text('image_url').notNull(),
  headline: text('headline').notNull(),
  bio: text('bio').notNull(),
});