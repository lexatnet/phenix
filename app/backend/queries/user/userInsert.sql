INSERT INTO "user"
  ("login", "password", "salt", "email")
VALUES
  ($1, $2, $3, $4)
RETURNING "id";
