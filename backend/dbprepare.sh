#sequelize db:migrate:undo:all
#sequelize db:migrate

curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Banh Keo"
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Sua Tuoi"
}'


curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Bánh quy trứng muối Đài Loan",
    "description":"Bánh quy trứng muối Đài Loan , Huong vi Thom NGon",
    "price":25000,
    "categoryId": 1
}'
curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Bánh dừa nướng 180g",
    "description":"Bánh dừa nướng 180g, Huong vi Thom Ngon",
    "price":35000,
    "categoryId": 1
}'

curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Sữa Vinamilk",
    "description":"Hộp 4 chiếc",
    "price":50000,
    "categoryId": 2
}'
curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Sữa TH True Milk",
    "description":"Hộp 4 chiếc",
    "price":40000,
    "categoryId": 2
}'
curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Sữa TH True Milk Hương Dâu",
    "description":"Hộp 4 chiếc Hương Dâu",
    "price":42000,
    "categoryId": 2
}'
curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
  --data '{
	"name": "Sữa Óc Chó",
    "description":"Hộp 4 chiếc Óc Chó ",
    "price":36000,
    "categoryId": 2
}'
