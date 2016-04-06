SELECT
  r."id"
FROM
  "role" AS r
WHERE
  r."id" IN (
      SELECT
        ur."role_id"
      FROM
        "user_role" AS ur
      WHERE
      ur."user_id" = $1
    );
