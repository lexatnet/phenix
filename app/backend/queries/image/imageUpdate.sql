UPDATE "image" SET
"title" = $1,
"name" = $2,
"path" = $3,
"extension" = $4,
"user_id" = $5,
"updated" = to_timestamp($6)
WHERE "id" = $7;
