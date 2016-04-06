SELECT
  *
FROM
  "role_full" AS rf
WHERE
  (
    rf."id" IN (
      SELECT
        ur."role_id"
      FROM
        "user_role" AS ur
      WHERE
      ur."user_id" = $1
    )
  )
  AND
  (
    rf."locale_id" = $2
  );
