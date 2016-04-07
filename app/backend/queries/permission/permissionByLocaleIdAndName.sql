SELECT *
FROM "permission_full"
WHERE
  "locale_id" = $1
  AND
  "name" = $2';
