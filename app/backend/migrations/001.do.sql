-- tables
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE TABLE IF NOT EXISTS "locale"(
    "id" bigserial PRIMARY KEY,
    "code" text NOT NULL,
    "title" text NOT NULL,
    "created" timestamp default NOW(),
    "updated" timestamp default NULL
);

CREATE TABLE IF NOT EXISTS "user"(
    "id" bigserial PRIMARY KEY,
    "login" varchar(254) UNIQUE NOT NULL,
    "password" varchar(60) NOT NULL,
    "salt" varchar(29) NOT NULL,
    "email" varchar(254) UNIQUE NOT NULL,
    "created" timestamp default NOW(),
    "updated" timestamp default NULL
);

CREATE TABLE IF NOT EXISTS "role"(
    "id" bigserial PRIMARY KEY,
    "name" text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "role_info"(
    "id" bigint REFERENCES "role"("id") ON DELETE CASCADE,
    "locale_id" bigint REFERENCES "locale"("id")  ON DELETE CASCADE,
    "title" text NOT NULL,
    CONSTRAINT "role_info_pk" PRIMARY KEY ("id","locale_id")
);

CREATE VIEW "role_full" AS
  SELECT
    r.*,
    ri."locale_id",
    ri."title"
  FROM "role" AS r
  JOIN "role_info" AS ri
  ON r."id"=ri."id";


CREATE TABLE IF NOT EXISTS "user_role"(
    "user_id" bigint REFERENCES "user"("id") ON DELETE CASCADE,
    "role_id" bigint REFERENCES "role"("id") ON DELETE CASCADE,
    CONSTRAINT "user_role_pk" PRIMARY KEY ("user_id","role_id")
);

CREATE TABLE IF NOT EXISTS "permission"(
    "id" bigserial PRIMARY KEY,
    "name" text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "permission_info"(
    "id" bigint REFERENCES "permission"("id") ON DELETE CASCADE,
    "locale_id" bigint REFERENCES "locale"("id")  ON DELETE CASCADE,
    "title" text NOT NULL,
    "description" text NOT NULL,
    CONSTRAINT "permission_info_pk" PRIMARY KEY ("id","locale_id")
);

CREATE VIEW "permission_full" AS
  SELECT
    p.*,
    pi."locale_id",
    pi."title",
    pi."description"
  FROM "permission" AS p
  JOIN "permission_info" AS pi
  ON p."id"=pi."id";

CREATE TABLE IF NOT EXISTS "role_permission"(
    "role_id" bigint REFERENCES "role"("id") ON DELETE CASCADE,
    "permission_id" bigint REFERENCES "permission"("id") ON DELETE CASCADE,
    CONSTRAINT "role_permission_pk" PRIMARY KEY ("role_id", "permission_id")
);

CREATE TABLE IF NOT EXISTS "image"(
    "id" bigserial PRIMARY KEY,
    "title" text NOT NULL,
    "name" text NOT NULL,
    "path" text NOT NULL,
    "extension" text default NULL,
    "user_id" bigint REFERENCES "user"("id"),
    "created" timestamp default NOW(),
    "updated" timestamp default NULL
);
