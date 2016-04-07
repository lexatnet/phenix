SELECT
  "*"
FROM
  "permission_full"
WHERE
  "id" = $1
  AND
  "locale_id" = $2';
