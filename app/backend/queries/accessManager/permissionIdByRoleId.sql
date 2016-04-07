SELECT
  p."id"
FROM
  "permission" AS p
WHERE
  p."id" IN (
      SELECT
        rp."permission_id"
      FROM
        "role_permission" AS rp
      WHERE
      rp."role_id" = $1
    );
