SELECT
*
FROM
  "permission_info"
WHERE
  "id" = $1
  AND
  "locale_id" = $2;
