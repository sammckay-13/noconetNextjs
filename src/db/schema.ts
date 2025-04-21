import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("nocomembers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phoneNumber: text("phonenumber"),
  mostrecentsignin: text("mostrecentsignin"),
});
