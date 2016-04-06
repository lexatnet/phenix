DELETE FROM "role_permission"
WHERE
  "role_id" = $1 AND
  "permission_id"=$2;
