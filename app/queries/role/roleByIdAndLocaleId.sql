SELECT
  *
FROM
  "role_full"
WHERE
  "id" = $1 AND "locale_id" = $2;
