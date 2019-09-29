# eCMS
Idea:
  Track Don Hang, Shipper will Report Status
  Give Point to User

TODO
1. THem Unit Name to Product (so in Cart, User easy to see quantity)
2. Add Order Position for Menu


# DB Tables:
#sequelize db:migrate:undo:all
#sequelize db:migrate

Player.belongsTo(Team)  // `teamId` will be added on Player / Source model
Coach.hasOne(Team)  // `coachId` will be added on Team / Target model
Project.hasMany(User, {as: 'Workers'}) //This will add the attribute projectId to User.

https://sequelize.readthedocs.io/en/2.0/api/datatypes/

### Product
//firstCategoryId is Nearast Parent ID
//secondCategoryId is parent ID of first
$ sequelize model:create --name DBProducts --attributes name:string,descShort:string,descMedium:text,descLong:text,unitPrice:float,stockNum:integer,active:boolean,imgThump:string,img1:string,img2:string,img3:string,img4:string,img5:string,img6:string,firstCategoryId:integer,secondCategoryId:integer,thirdCategoryId:integer,brandId:integer,parentProductId:integer,productAttributeId:integer

### Discount

// type: "discount", "coupon", "gift"
// Amount: by fixMoney (Higher Priority) or percent
//Apply Priority: General-All prouducts -> Category -> Brand -> Product ID 
$ sequelize model:create --name DBDiscounts --attributes desc:text,from:date,to:date,type:string,fixMoney:integer,percent:smallint,applyCategoryId:integer,applyBrandId:integer,applyProductId:integer,img:string,coupon:string


### Category
$ sequelize model:create --name DBCategories --attributes name:string,desc:text,active:boolean,order:smallint,parentCategoryId:integer

### Country
name, code
$ sequelize model:create --name DBCountries --attributes name:string,code:text

### Brand
name, imgLogo, countryId, active
$ sequelize model:create --name DBBrands --attributes name:string,imgLogo:string,countryId:integer,active:boolean

### AttributeGroup
name
$ sequelize model:create --name DBAttributeGroups --attributes name:string

### Attribute
name, value, attributeGroupId
$ sequelize model:create --name DBAttributes --attributes name:string,value:string,attributeGroupId:integer

### ProductAttribute
productId, attributeId
$ sequelize model:create --name DBProductAttributes --attributes productId:integer,attributeId:integer

### Role
$ sequelize model:create --name DBRoles --attributes rolename:string

### User, can be use for FB and Google also
$ sequelize model:create --name DBUsers --attributes userId:string,email:string,phone:string,password:string,fullName:string,pictureUrl:string,accessToken:string,userType:string,roleId:integer


### Cart (Lightweight cart, for simialr as LocalStorage)
$ sequelize model:create --name DBCarts --attributes userId:string,productId:integer,quantity:smallint
### RecentViews
$ sequelize model:create --name DBRecentViews --attributes userId:integer,productId:integer
### Favorites
$ sequelize model:create --name DBFavorites --attributes userId:string,productId:integer


## Using in Sequilize
sequelize init
sequelize model:create --name TodoItem --attributes content:string,complete:boolean

  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file       [aliases: migration:create]
  sequelize model:generate                    Generates a model and its migration  [aliases: model:create]
  sequelize seed:generate                     Generates a new seed file            [aliases: seed:create]

username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    
# APIs


# References
NodeJS with Postgres
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize



# DB Scripts

Get
// Get product of category
curl --request GET --url http://localhost:5000/api/products/OfCategory/15

curl --request GET --url http://localhost:5000/api/categories
curl --request GET --url http://localhost:5000/api/categoriesFull
curl --request GET --url http://localhost:5000/api/categoriesFull/1

## Category Preparations

curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Banh Keo"
}'

curl --request POST --url http://localhost:5000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Sua Tuoi"
}'

