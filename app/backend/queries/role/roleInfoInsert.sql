INSERT INTO "role_info" ("id", "locale_id", "title") VALUES ($1, $2, $3) RETURNING "id";
