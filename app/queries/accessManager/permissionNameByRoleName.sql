SELECT
  p."name"
FROM
  "permission" AS p
WHERE
  p."id" IN (
    SELECT rp."permission_id"
    FROM "role_permission" AS rp
    WHERE rp."role_id" IN(
      SELECT r."id"
      FROM "role" AS r
      WHERE r."name" = $1
    )
  );
