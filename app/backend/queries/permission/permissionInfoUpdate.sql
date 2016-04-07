UPDATE
  "permission_info"
SET
  "title" = $1,
  "description" = $2
WHERE
  "id" = $3
  AND
  "locale_id" = $4;
