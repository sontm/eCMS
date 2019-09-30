// Recent View, Favorite...

import AppUtil from '../components/AppUtil'

const DBCarts = require('../server/models').DBCarts;
const DBFavorites = require('../server/models').DBFavorites;
const DBRecentViews = require('../server/models').DBRecentViews;
const DBUsers = require('../server/models').DBUsers;
const DBProducts = require('../server/models').DBProducts;
const DBBrands = require('../server/models').DBBrands;
const DBCategories = require('../server/models').DBCategories;
const DBCountries = require('../server/models').DBCountries;
const DBAttributes = require('../server/models').DBAttributes;
const DBAttributeGroups = require('../server/models').DBAttributeGroups;
const DBDiscounts = require('../server/models').DBDiscounts;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
  
    addUserRecentViews(req, res) {
        console.log("Server, addUserRecentViews")
        console.log(req.body)
        //userId, productId
        return DBRecentViews
            .findOne({
                where: {
                    userId: req.body.userId,
                    [Op.and]: {
                        productId: req.body.productId
                    }
                }
            })
            .then(result => {
                if (result) {
                    console.log("Server, RecentVeiw Exist, WIll Update")
                    // User already View this Record, (here update a ID, timestamp auto updated)
                    result.changed('updatedAt', true); // Set this to Force Udpate updatedAt
                    return result.update({updatedAt: new Date()})
                        .then(ret => {
                            console.log("   Updated")
                            res.status(201).send(ret)
                        })
                        .catch(error => {
                            console.log(" ****** Error 3")
                            res.status(400).send(error)
                        });
                } else {
                    console.log("Server, RecentVeiw not Exist, insert New")
                    return DBRecentViews
                        .create(req.body)
                        .then(result => {
                            res.status(201).send(result)
                        })
                        .catch(error => {
                            console.log(" ****** Error 2")
                            res.status(400).send(error)
                        });
                }
            })
            .catch(error => {
                console.log(" ****** Error 1")
                console.log(error)
                res.status(400).send(error)
            });
    },
    getRecentViewsOfUser(req, res) {
        //userId
        console.log("server getRecentViewsOfUser")
        console.log(req.params.userId)
        let nowDateTime = new Date();
        return DBProducts
            .findAll({
                include: [{
                    model:DBUsers,
                    as: 'recentViews',
                    where: {
                        id: req.params.userId
                    },
                    through: {
                        attributes: ['updatedAt']
                    },
                    attributes: ['updatedAt'],
                },{
                    model: DBCategories,
                    as: 'categories',
                    include: [{
                        model:DBDiscounts, // Query Discount also
                        as:'cateDiscounts',
                        where: {
                      from: {[Op.lte]: nowDateTime},
                      [Op.and]: {
                        to: {[Op.gte]: nowDateTime}
                      }
                    },
                    required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                    }]
                  },{
                    model: DBBrands,
                    as: 'brands',
                    include: [{
                      model:DBCountries,
                      as: 'countries'
                    },{
                        model:DBDiscounts, // Query Discount also
                        as:'brandDiscounts',
                        where: {
                          from: {[Op.lte]: nowDateTime},
                          [Op.and]: {
                            to: {[Op.gte]: nowDateTime}
                          }
                        },
                        required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                    }] 
                  },{
                    model: DBAttributes,
                    as: 'attributes',
                    through: {attributes: []},
                    include: [{
                      model:DBAttributeGroups,
                      as: 'attributeGroups'
                    }] 
                  },{
                    model: DBDiscounts,// Get Discounts of Product
                    as: 'productDiscounts',// Must Have
                    where: {
                      from: {[Op.lte]: nowDateTime},
                      [Op.and]: {
                        to: {[Op.gte]: nowDateTime}
                      }
                    },
                    required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                  }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                order: [
                    // THis is Multi Level Order
                    [{model: DBUsers, as: 'recentViews'}, DBRecentViews, 'updatedAt', 'DESC'],
                    // ['fixMoney', 'ASC'],
                ],
            })
            .then(result => {
                res.status(201).send(result)
            })
            .catch(error => res.status(400).send(error));
    },



    addUserFavorite(req, res) {
        console.log("Server, addUserFavorite")
        console.log(req.body)
        //userId, productId
        return DBFavorites
            .findOne({
                where: {
                    userId: req.body.userId,
                    [Op.and]: {
                        productId: req.body.productId
                    }
                }
            })
            .then(result => {
                if (result) {
                    console.log("Server, DBFavorites Exist, WIll Update")
                    // User already View this Record, (here update a ID, timestamp auto updated)
                    result.changed('updatedAt', true); // Set this to Force Udpate updatedAt
                    return result.update({updatedAt: new Date()})
                        .then(ret => {
                            console.log("   Updated")
                            res.status(201).send(ret)
                        })
                        .catch(error => {
                            console.log(" ****** Error 3")
                            res.status(400).send(error)
                        });
                } else {
                    console.log("Server, DBFavorites not Exist, insert New")
                    return DBFavorites
                        .create(req.body)
                        .then(result => {
                            res.status(201).send(result)
                        })
                        .catch(error => {
                            console.log(" ****** Error 2")
                            res.status(400).send(error)
                        });
                }
            })
            .catch(error => {
                console.log(" ****** Error 1")
                console.log(error)
                res.status(400).send(error)
            });
    },
    getFavoritesOfUser(req, res) {
        //userId
        console.log("server getFavoritesOfUser")
        console.log(req.params.userId)
        let nowDateTime = new Date();
        return DBProducts
            .findAll({
                include: [{
                    model:DBUsers,
                    as: 'favorites',
                    where: {
                        id: req.params.userId
                    },
                    through: {
                        attributes: ['updatedAt']
                    },
                    attributes: ['updatedAt'],
                },{
                    model: DBCategories,
                    as: 'categories',
                    include: [{
                        model:DBDiscounts, // Query Discount also
                        as:'cateDiscounts',
                        where: {
                      from: {[Op.lte]: nowDateTime},
                      [Op.and]: {
                        to: {[Op.gte]: nowDateTime}
                      }
                    },
                    required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                    }]
                  },{
                    model: DBBrands,
                    as: 'brands',
                    include: [{
                      model:DBCountries,
                      as: 'countries'
                    },{
                        model:DBDiscounts, // Query Discount also
                        as:'brandDiscounts',
                        where: {
                          from: {[Op.lte]: nowDateTime},
                          [Op.and]: {
                            to: {[Op.gte]: nowDateTime}
                          }
                        },
                        required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                    }] 
                  },{
                    model: DBAttributes,
                    as: 'attributes',
                    through: {attributes: []},
                    include: [{
                      model:DBAttributeGroups,
                      as: 'attributeGroups'
                    }] 
                  },{
                    model: DBDiscounts,// Get Discounts of Product
                    as: 'productDiscounts',// Must Have
                    where: {
                      from: {[Op.lte]: nowDateTime},
                      [Op.and]: {
                        to: {[Op.gte]: nowDateTime}
                      }
                    },
                    required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                  }],
                attributes: {exclude: ['createdAt', 'updatedAt']},
                order: [
                    // THis is Multi Level Order
                    [{model: DBUsers, as: 'favorites'}, DBFavorites, 'updatedAt', 'DESC'],
                    // ['fixMoney', 'ASC'],
                ],
            })
            .then(result => {
                res.status(201).send(result)
            })
            .catch(error => res.status(400).send(error));
    },




    getUserCartItems(req, res) {
      //userId
      console.log("server getUserCartItems")
      console.log(req.params.userId)
      let nowDateTime = new Date();
      let userId = req.params.userId;
      if (!userId) {
        userId = req.body.userId;
      }
      return DBProducts
          .findAll({
              include: [{
                  model:DBUsers,
                  as: 'cartItems',
                  where: {
                      id: userId
                  },
                  through: {
                    attributes: ['updatedAt']
                },
                attributes: ['updatedAt'],
              },{
                  model: DBCategories,
                  as: 'categories',
                  include: [{
                      model:DBDiscounts, // Query Discount also
                      as:'cateDiscounts',
                      where: {
                    from: {[Op.lte]: nowDateTime},
                    [Op.and]: {
                      to: {[Op.gte]: nowDateTime}
                    }
                  },
                  required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                  }]
                },{
                  model: DBBrands,
                  as: 'brands',
                  include: [{
                    model:DBCountries,
                    as: 'countries'
                  },{
                      model:DBDiscounts, // Query Discount also
                      as:'brandDiscounts',
                      where: {
                        from: {[Op.lte]: nowDateTime},
                        [Op.and]: {
                          to: {[Op.gte]: nowDateTime}
                        }
                      },
                      required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                  }] 
                },{
                  model: DBAttributes,
                  as: 'attributes',
                  through: {attributes: []},
                  include: [{
                    model:DBAttributeGroups,
                    as: 'attributeGroups'
                  }] 
                },{
                  model: DBDiscounts,// Get Discounts of Product
                  as: 'productDiscounts',// Must Have
                  where: {
                    from: {[Op.lte]: nowDateTime},
                    [Op.and]: {
                      to: {[Op.gte]: nowDateTime}
                    }
                  },
                  required:false // Set false to use Left Outer Join (if NOT, only Product with Discount Valid is chosen)
                }],
              attributes: {exclude: ['createdAt', 'updatedAt']},
              order: [
                  // THis is Multi Level Order
                  [{model: DBUsers, as: 'cartItems'}, DBCarts, 'updatedAt', 'DESC'],
                  // ['fixMoney', 'ASC'],
              ],
          })
          .then(result => {
              res.status(201).send(result)
          })
          .catch(error => res.status(400).send(error));
    },
    addUserCartItem(req, res) {
      console.log("Server, addUserCartItem")
      console.log(req.body)
      //userId, productId
      return DBCarts
          .findOne({
              where: {
                  userId: req.body.userId,
                  [Op.and]: {
                      productId: req.body.productId
                  }
              }
          })
          .then(result => {
              if (result) {
                  console.log("Server, DBCarts Exist, WIll Update")
                  // User already View this Record, (here update a ID, timestamp auto updated)
                  result.changed('updatedAt', true); // Set this to Force Udpate updatedAt
                  return result.update(
                    {
                      updatedAt: new Date(),
                      quantity: result.quantity + req.body.quantity
                    })
                      .then(ret => {
                          console.log("   Updated")
                          //res.status(201).send(ret)
                          module.exports.getUserCartItems(req, res)
                      })
                      .catch(error => {
                          console.log(" ****** Error 3")
                          console.log(error)
                          res.status(400).send(error)
                      });
              } else {
                  console.log("Server, DBCarts not Exist, insert New")
                  return DBCarts
                      .create(req.body)
                      .then(result => {
                          //res.status(201).send(result)
                          module.exports.getUserCartItems(req, res)
                      })
                      .catch(error => {
                          console.log(" ****** Error 2")
                          console.log(error)
                          res.status(400).send(error)
                      });
              }
          })
          .catch(error => {
              console.log(" ****** Error 1")
              console.log(error)
              res.status(400).send(error)
          });
    },
    
    // userId, productId
    removeUserCartItem(req, res) {
      console.log("Server, removeUserCartItem")
      console.log(req.body)
      //userId, productId
      return DBCarts
          .findOne({
              where: {
                  userId: req.body.userId,
                  [Op.and]: {
                      productId: req.body.productId
                  }
              }
          })
          .then(result => {
              if (result) {
                  console.log("Server, DBCarts Exist, WIll Delete")
                  // TODO, we use a Flag for delte, not delete record
                  // User already View this Record, (here update a ID, timestamp auto updated)
                  return result.destroy()
                      .then(ret => {
                          console.log("   Deleted")

                          // Re-query new Items
                          module.exports.getUserCartItems(req, res)
                      })
                      .catch(error => {
                          console.log(" ****** Error 3")
                          res.status(400).send(error)
                      });
              }
          })
          .catch(error => {
              console.log(" ****** Error 1")
              console.log(error)
              res.status(400).send(error)
          });
    },
}