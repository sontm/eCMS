# eCMS

# DB Tables:

Player.belongsTo(Team)  // `teamId` will be added on Player / Source model
Coach.hasOne(Team)  // `coachId` will be added on Team / Target model
Project.hasMany(User, {as: 'Workers'}) //This will add the attribute projectId to User.

https://sequelize.readthedocs.io/en/2.0/api/datatypes/

### Product
$ sequelize model:create --name DBProduct --attributes name:string,image:string,description:string,available:boolean,price:float

// complete:boolean

### Category

$ sequelize model:create --name DBCategory --attributes name:string,icon:string



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


# APIs


# References
NodeJS with Postgres
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize



# DB Scripts

Get
// Get product of category
curl --request GET --url http://localhost:3000/api/products/OfCategory/1

curl --request GET --url http://localhost:3000/api/categories
curl --request GET --url http://localhost:3000/api/categoriesFull
curl --request GET --url http://localhost:3000/api/categoriesFull/1

## Category Preparations

curl --request POST --url http://localhost:3000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Banh Keo"
}'

curl --request POST --url http://localhost:3000/api/categories --header 'content-type: application/json' \
  --data '{
	"name": "Sua Tuoi"
}'

