#sequelize init

#sequelize model:create --name DBBrands --attributes name:string,imgLogo:string,countryId:integer,active:boolean
#sequelize model:create --name DBCountries --attributes name:string,code:text
#sequelize model:create --name DBAttributeGroups --attributes name:string
#sequelize model:create --name DBAttributes --attributes name:string,value:string,attributeGroupId:integer
#sequelize model:create --name DBProductAttributes --attributes productId:integer,attributeId:integer

#sequelize db:migrate:undo:all
#sequelize db:migrate

# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Bánh Kẹo",
#   "active": true
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Thực Phẩm",
#   "active": true
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Đồ Uống",
#   "active": true
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Bánh",
#   "active": true,
#   "parentCategoryId":1
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Kẹo",
#   "active": true,
#   "parentCategoryId":1
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Thực Phẩm Khô",
#   "active": true,
#   "parentCategoryId":2
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Đồ Hộp",
#   "active": true,
#   "parentCategoryId":2
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Bia",
#   "active": true,
#   "parentCategoryId":3
# }'
# curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
#   --data '{
# 	"name": "Nước Ngọt",
#   "active": true,
#   "parentCategoryId":3
# }'

curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Bánh Cứng",
  "active": true,
  "parentCategoryId":3
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Bánh Mềm",
  "active": true,
  "parentCategoryId":4
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Bánh Cứng",
  "active": true,
  "parentCategoryId":4
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Kẹo Cứng",
  "active": true,
  "parentCategoryId":5
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Kẹo Mềm",
  "active": true,
  "parentCategoryId":5
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Hoa Quả Khô",
  "active": true,
  "parentCategoryId":6
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Thực Phẩm Khô",
  "active": true,
  "parentCategoryId":6
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Bia Lon",
  "active": true,
  "parentCategoryId":8
}'
curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Bia Chai",
  "active": true,
  "parentCategoryId":8
}'

curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Việt Nam",
  "code":"vn"
}'
curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Nhật Bản",
  "code":"jp"
}'
curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Đài Loan",
  "code":"tw"
}'
curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Hàn Quốc",
  "code":"kr"
}'
curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Trung Quốc",
  "code":"cn"
}'
curl --request POST --url http://localhost:5000/api/countries --header 'content-type: application/json' \
  --data '{
	"name": "Mỹ",
  "code":"us"
}'

# curl --request POST --url http://localhost:5000/api/brands --header 'content-type: application/json' \
#   --data '{
# 	"name": "Đài Loan",
#   "countryId":"3",
#   "active":true
# }'
# curl --request POST --url http://localhost:5000/api/brands --header 'content-type: application/json' \
#   --data '{
# 	"name": "Orang Tua",
#   "countryId":"5",
#   "active":true
# }'
# curl --request POST --url http://localhost:5000/api/brands --header 'content-type: application/json' \
#   --data '{
# 	"name": "OREO",
#   "countryId":"6",
#   "active":true
# }'
# curl --request POST --url http://localhost:5000/api/brands --header 'content-type: application/json' \
#   --data '{
# 	"name": "Calbee",
#   "countryId":"2",
#   "active":true
# }'
# curl --request POST --url http://localhost:5000/api/brands --header 'content-type: application/json' \
#   --data '{
# 	"name": "Tiger Beer",
#   "countryId":"6",
#   "active":true
# }'
# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Bánh quy trứng muối Đài Loan",
#     "descShort":"Bánh quy trứng muối Đài Loan Desc Short",
#     "descMedium":"Bánh thơm ngon, hòa nguyện nhân trứng muối.<CRLF>Trọng lượng: 500gr.Desc Medium",
#     "descLong":"Bánh quy trứng muối Đài Loan Desc Long",
#     "unitPrice":150000,
#     "stockNum": 100,
#     "active":true,
#     "imgThump":"p1_1.jpg",
#     "img1":"p1_1.jpg",
#     "firstCategoryId":4,
#     "secondCategoryId":1,
#     "brandId":1
# }'
# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Bánh quy trứng muối Đài Loan",
#     "descShort":"Bánh quy trứng muối Đài Loan Desc Short",
#     "descMedium":"Bánh thơm ngon, hòa nguyện nhân trứng muối.<CRLF>Trọng lượng: 500gr.Desc Medium",
#     "descLong":"Bánh quy trứng muối Đài Loan Desc Long",
#     "unitPrice":150000,
#     "stockNum": 100,
#     "active":true,
#     "imgThump":"p2_1.jpg",
#     "img1":"p2_1.jpg",
#     "firstCategoryId":4,
#     "secondCategoryId":1,
#     "brandId":3
# }'
# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Hộp 10 Gói Bánh Kinh Đô Mini Oreo Vị Vani (230g)",
#     "descShort":"Hộp 10 Gói Bánh Kinh Đô Mini Oreo Vị Vani (230g) Desc Short",
#     "descMedium":"Hộp 10 Gói Bánh Kinh Đô Mini Oreo Vị Vani (230g)<CRLF>Desc Medium",
#     "descLong":"Hộp 10 Gói Bánh Kinh Đô Mini Oreo Vị Vani (230g) Desc Long",
#     "unitPrice":54000,
#     "stockNum": 100,
#     "active":true,
#     "imgThump":"p3_1.jpg",
#     "img1":"p3_1.jpg",
#     "firstCategoryId":4,
#     "secondCategoryId":1,
#     "brandId":4
# }'



# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g",
#     "descShort":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g Desc Short",
#     "descMedium":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g<CRLF>Desc Medium",
#     "descLong":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g Desc Long",
#     "unitPrice":169000,
#     "stockNum": 100,
#     "active":true,
#     "imgThump":"ptp_1_1.jpg",
#     "img1":"ptp_1_1.jpg",
#     "img2":"ptp_1_2.jpg",
#     "firstCategoryId":6,
#     "secondCategoryId":2,
#     "brandId":5
# }'

# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Ngũ Cốc Sấy Khô Calbee nội địa Nhật Bản 800g",
#     "descShort":"Ngũ Cốc Sấy Khô Calbee nội địa Nhật Bản 800g Desc Short",
#     "descMedium":"Ngũ Cốc Sấy Khô Calbee nội địa Nhật Bản 800g<CRLF>Desc Medium",
#     "descLong":"Ngũ Cốc Sấy Khô Calbee nội địa Nhật Bản 800g <CRLF>Desc Long",
#     "unitPrice":165000,
#     "stockNum": 100,
#     "active":true,
#     "imgThump":"ptp_2_1.jpg",
#     "img1":"ptp_2_1.jpg",
#     "firstCategoryId":6,
#     "secondCategoryId":2,
#     "brandId":5
# }'


# curl --request POST --url http://localhost:5000/api/products --header 'content-type: application/json' \
#   --data '{
# 	  "name": "Lốc 6 Lon Tiger Thường (330ml / Lon)",
#     "descShort":"Lốc 6 Lon Tiger Thường (330ml / Lon) Desc Short",
#     "descMedium":"Lốc 6 Lon Tiger Thường (330ml / Lon)<CRLF>Desc Medium",
#     "descLong":"Lốc 6 Lon Tiger Thường (330ml / Lon) <CRLF>Desc Long",
#     "unitPrice":82000,
#     "stockNum": 1000,
#     "active":true,
#     "imgThump":"pdu_1_1.jpg",
#     "img1":"pdu_1_1.jpg",
#     "firstCategoryId":8,
#     "secondCategoryId":3,
#     "brandId":6
# }'