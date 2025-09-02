import {
  bigint,
  boolean,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  progress: bigint("progress", { mode: "number" })
    .default(0)
    .references(() => questionTable.no)
    .notNull(),
  role: text("role", { enum: ["participant", "admin"] })
    .default("participant")
    .notNull(),
}).enableRLS();

export const userRelations = relations(userTable, ({ one, many }) => ({
  submissions: many(submissionTable),
  otp: one(otpTable, {
    fields: [userTable.id],
    references: [otpTable.user_id],
  }),
  devices: many(devicesTable),
  scans: many(scanTable),
  question: one(questionTable, {
    fields: [userTable.progress],
    references: [questionTable.no],
  }),
}));

export const questionTable = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  no: bigint("no", { mode: "number" }).unique().notNull(),
  title: text("title").notNull(),
  question: text("question"),
  flag: text("flag").unique().notNull(),
  score: bigint("score", { mode: "number" }).notNull(),
}).enableRLS();

export const questionRelations = relations(questionTable, ({ many }) => ({
  submissions: many(submissionTable),
  assets: many(assetTable),
  pie: many(pieTable),
  scans: many(scanTable),
  questions: many(userTable),
}));

export const submissionTable = pgTable(
  "submission",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    question_id: uuid("question_id")
      .references(() => questionTable.id)
      .notNull(),
    user_id: uuid("user_id")
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
    position: bigint("position", { mode: "number" }).notNull(),
    time: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  },
  (t) => ({
    first: unique("custom_name")
      .on(t.question_id, t.user_id)
      .nullsNotDistinct(),
    second: unique("custom_name2")
      .on(t.question_id, t.position)
      .nullsNotDistinct(),
  }),
).enableRLS();

export const submissionRelations = relations(
  submissionTable,
  ({ one, many }) => ({
    question: one(questionTable, {
      fields: [submissionTable.question_id],
      references: [questionTable.id],
    }),
    user: one(userTable, {
      fields: [submissionTable.user_id],
      references: [userTable.id],
    }),
    assets: many(assetTable),
  }),
);

export const assetTable = pgTable("asset", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  question_id: uuid("question_id")
    .references(() => questionTable.id)
    .notNull(),
  url: text("url").notNull(),
  type: text("type", {
    enum: ["image", "video", "audio", "zip", "pdf", "srt", "url"],
  }).notNull(),
  downloadable: boolean("downloadable").notNull(),
}).enableRLS();

export const assetRelations = relations(assetTable, ({ one }) => ({
  question: one(questionTable, {
    fields: [assetTable.question_id],
    references: [questionTable.id],
  }),
  transcript: one(transcriptTable, {
    fields: [assetTable.id],
    references: [transcriptTable.audio_id],
  }),
}));

export const transcriptTable = pgTable("transcript", {
  audio_id: uuid("audio_id")
    .primaryKey()
    .references(() => assetTable.id),
  transcript_id: uuid("transcript_id")
    .notNull()
    .references(() => assetTable.id),
});

export const transcriptRelations = relations(transcriptTable, ({ one }) => ({
  audio: one(assetTable, {
    fields: [transcriptTable.audio_id],
    references: [assetTable.id],
  }),
  transcript: one(assetTable, {
    fields: [transcriptTable.transcript_id],
    references: [assetTable.id],
  }),
}));

export const otpTable = pgTable("otp", {
  user_id: uuid("user_id")
    .primaryKey()
    .references(() => userTable.id),
  otp: varchar("otp", { length: 6 }).unique().notNull(),
  expiry: timestamp({ withTimezone: true, mode: "string" }).notNull(),
}).enableRLS();

export const otpRelations = relations(otpTable, ({ one }) => ({
  user: one(userTable, {
    fields: [otpTable.user_id],
    references: [userTable.id],
  }),
}));

export const devicesTable = pgTable("devices", {
  id: varchar("id", { length: 8 }).notNull(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  timestamp: timestamp({ withTimezone: true, mode: "string" }).notNull(),
});

export const devicesRelations = relations(devicesTable, ({ one }) => ({
  user: one(userTable, {
    fields: [devicesTable.user_id],
    references: [userTable.id],
  }),
}));

export const pieTable = pgTable("pie", {
  id: uuid("id").defaultRandom().primaryKey(),
  pie_no: bigint("pie_no", { mode: "number" }).notNull(),
  hint: text("hint").notNull(),
  range: bigint("range", { mode: "number" }).notNull(),
  question_id: uuid("question_id")
    .references(() => questionTable.id)
    .notNull(),
});

export const pieRelations = relations(pieTable, ({ one }) => ({
  question: one(questionTable, {
    fields: [pieTable.question_id],
    references: [questionTable.id],
  }),
}));

export const scanTable = pgTable("scan", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  question_id: uuid("question_id")
    .references(() => questionTable.id)
    .notNull(),
  hint: text("hint").notNull(),
  status: text("status", {
    enum: ["default", "requested", "scanned"],
  }).notNull(),
  scan_time: timestamp({ withTimezone: true, mode: "string" }).notNull(),
});

export const scanRelations = relations(scanTable, ({ one }) => ({
  user: one(userTable, {
    fields: [scanTable.user_id],
    references: [userTable.id],
  }),
  question: one(questionTable, {
    fields: [scanTable.question_id],
    references: [questionTable.id],
  }),
}));
