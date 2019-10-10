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
const DBOrders = require('../server/models').DBOrders;
const DBOrderItemss = require('../server/models').DBOrderItemss;
const DBOrderItemAttributes = require('../server/models').DBOrderItemAttributes;
const DBShipments = require('../server/models').DBShipments;

const models = require('../server/models');
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

    placeOrder(req, res) {
      console.log("Server, placeOrder")
      console.log(req.body)
      let orderItemRecords = [];
      
      let itemTotalPrice = 0;
      req.body.products.forEach(item => {
        itemTotalPrice += item.unitPrice * 1;
        orderItemRecords.push({
          name:item.name,
          descShort:item.descShort,
          descMedium:item.descMedium,
          unitPrice:item.unitPrice,
          imgThump:item.imgThump,
          quantity:1, // TODO for actual quantity
          unitDiscountMoney:0, // TODO for discount
          finalTotal:item.unitPrice * 1,
          firstCategoryId:item.firstCategoryId,
          brandId:item.brandId,
          productId:item.id,
          orderId:0,
          shipmentId:0
        })
      });

      let orderNumberSuccess = AppUtil.makeRandomAlphaNumeric(12);
      let orderRecord = {
        customerIdFK: req.body.customer.id,
        custId:req.body.customer.userId,
        custFullName:req.body.customer.fullName,
        custProvince:"",
        custDistrict:"",
        custAddress:"",
        custPhone:req.body.customer.phone,
        custEmail:req.body.customer.email,
        itemTotal:itemTotalPrice,
        shipTotal:0,
        finalTotal:itemTotalPrice - 0,
        orderNumber:orderNumberSuccess,
        placeDate: new Date(),
        status:"pending"
      }
      return models.sequelize.transaction(t => {
        // chain all your queries here. make sure you return them.
        return DBOrders.create(orderRecord, {transaction: t})
        .then(order => {
          console.log("   Result of Order:")
          console.log(order)
          let orderId = order.id;
          orderItemRecords.forEach(oir => {
            oir.orderId =orderId;
          })
          return DBOrderItemss.bulkCreate(orderItemRecords, {transaction: t})
          .then (orderItems => {
            console.log("     Result of OrderItems:")
            console.log(orderItems)
            
            let orderItemAttributes = [];
            orderItems.forEach(ite => {
              for (let l = 0; l < req.body.products.length; l++) {
                if (req.body.products[l].id == ite.productId) {
                  let thisOrderItemId = ite.id;
                  
                  req.body.products[l].attributes.forEach(att => {
                    orderItemAttributes.push({
                      name:att.name,
                      value:att.value,
                      attributeGroupName:att.attributeGroups.name,
                      orderItemId:thisOrderItemId,
                      productId:ite.productId
                    })
                  })
                }
              }
            })
            console.log("     Data to Insert to OrderItemAttribute:")
            console.log(orderItemAttributes)
            return DBOrderItemAttributes.bulkCreate(orderItemAttributes, {transaction: t})
            .then (orderItemAtts => {
              console.log("        Well, Done Insert to  DBOrderItemAttributes")
              console.log(orderItemAtts)
            })
          })
        });
      
      }).then(result => {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        console.log("   OKKKKKK Transaction completed")
        res.status(201).send({orderNumber:orderNumberSuccess})
      }).catch(err => {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        console.log("   ERRRRRR Transaction Error")
        console.log(err)
        res.status(400).send(err)
      });
    },
    getUserOrders(req, res) {
      //userId
      
      let userId = req.params.userId;
      if (!userId) {
        userId = req.body.userId;
      }
      console.log("server getUserOrders,userId:" + userId)
      return DBOrders
          .findAll({
              where: {
                customerIdFK: userId
              },
              include: [
                {
                  model: DBOrderItemss,
                  as: 'orderItems',
                  include: [{
                      model:DBOrderItemAttributes, // Query Discount also
                      as:'attributes'
                  }]
                },
                {
                  model: DBShipments,
                  as: 'shipments'
                }],
              attributes: {exclude: ['createdAt', 'updatedAt']},
              order: [
                  ['placeDate', 'DESC'],
                  // ['fixMoney', 'ASC'],
              ],
          })
          .then(result => {
              res.status(201).send(result)
          })
          .catch(error => res.status(400).send(error));
    },
}