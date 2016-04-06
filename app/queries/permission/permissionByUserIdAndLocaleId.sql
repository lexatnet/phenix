SELECT
  *
FROM
  "permission_full" AS pf
WHERE
  pf."id" IN (
    SELECT rp."permission_id"
    FROM "role_permission" AS rp
    WHERE rp."role_id" IN(
      SELECT ur."role_id"
      FROM "user_role" AS ur
      WHERE ur."user_id" = $1
    )
  )
  AND
  (pf."locale_id" = $2);
