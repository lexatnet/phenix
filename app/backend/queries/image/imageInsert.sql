INSERT INTO "image"
  ("title", "name", "path", "extension", "user_id")
VALUES ($1, $2, $3, $4, $5 )
RETURNING "id";
