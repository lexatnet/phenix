UPDATE "user" SET
"login" = $1,
"password" = $2,
"salt" = $3,
"email" = $4,
"updated" = to_timestamp($5) 
WHERE "id" = $6;
