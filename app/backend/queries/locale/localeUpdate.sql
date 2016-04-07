UPDATE
  "locale"
SET
  "code" = $1,
  "title" = $2,
  "updated" = to_timestamp($3) 
WHERE
  "id" = $4;
