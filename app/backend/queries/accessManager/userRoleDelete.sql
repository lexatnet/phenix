DELETE FROM "user_role"
WHERE
  "user_id" = $1 AND
  "role_id"=$2;
