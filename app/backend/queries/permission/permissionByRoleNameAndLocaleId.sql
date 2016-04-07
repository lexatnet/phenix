SELECT
  *
FROM
  "permission_full" AS pf
WHERE
  pf."id" IN (
    SELECT rp."permission_id"
    FROM "role_permission" AS rp
    WHERE rp."role_id" IN(
      SELECT r."role_id"
      FROM "role" AS r
      WHERE r."name" = $1
    )
  )
  AND
  (pf."locale_id" = $2);
