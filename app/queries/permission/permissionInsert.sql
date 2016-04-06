INSERT INTO "permission"
  ("name")
VALUES
  ($1)
RETURNING "id";
