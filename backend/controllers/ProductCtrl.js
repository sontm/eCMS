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
  create(req, res) {
    return DBProducts
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    console.log("getAll")
    console.log(req.body);
      return DBProducts
      .findAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  getAllOfCategory(req, res) {
    console.log("getAllOfCategory")
    console.log(req.body);
    console.log("  Query:")
    console.log(req.query.lvl)
    var wherObj = {firstCategoryId: req.params.categoryId};
    if (req.query.lvl == 2) {
      wherObj = {secondCategoryId: req.params.categoryId};
    } else if (req.query.lvl == 3) {
      wherObj = {thirdCategoryId: req.params.categoryId};
    }
    console.log(wherObj)
      return DBProducts
      .findAll({
          where: wherObj,
          include: [{
            model: DBBrands,
            as: 'brands',
            include: [{
              model:DBCountries,
              as: 'countries'
            }] 
            },{
            model: DBAttributes,
            as: 'attributes',
            through: {attributes: []},
            include: [{
              model:DBAttributeGroups,
              as: 'attributeGroups'
            }] 
          }]
      })
      .then(result => {
        console.log(result)
        res.status(200).send(result)
      })
      .catch(error => res.status(400).send(error));
  },
  getProductDetail(req, res) {
    console.log("getProductDetail........")
    console.log(req.body);
    let nowDateTime = new Date();
      return DBProducts
      //.findByPk(req.params.productId)
      .findAll({
        where: {id: req.params.productId},
        include: [{
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
        }]
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  // POST params: {"category":{id:1, level:2}, "brands":[1],"brandCountries":[],"attributes":[]}
  queryProducts(req, res) {
    console.log("queryProducts.............")
    console.log(req.body)
    var wherObj = {firstCategoryId: req.body.category.id};
    if (req.body.category.level == 2) {
      wherObj = {secondCategoryId: req.body.category.id};
    } else if (req.body.category.level == 3) {
      wherObj = {thirdCategoryId: req.body.category.id};
    }
    
    // Include Brands if have
    var wherObjBrand={};
    if (req.body.brands && req.body.brands.length > 0) {
        wherObjBrand = {id: {[Op.in]: req.body.brands}};
    }
    // Include Brand COuntrys if have
    var wherObjBrandCountry={};
    if (req.body.brandCountries && req.body.brandCountries.length > 0) {
      wherObjBrandCountry = {id: {[Op.in]: req.body.brandCountries}};
    }
    // Include Attribute if have
    var wherObjAtt={};
    if (req.body.attributes && req.body.attributes.length > 0) {
      wherObjAtt = {id: {[Op.in]: req.body.attributes}};
    }
    let nowDateTime = new Date(); // TODO: careful with this Now TImeZone
    console.log("Where OBJ ......., Now:" + nowDateTime)
    console.log(wherObj)
    console.log(wherObjBrand)
    return DBProducts
    .findAll({
        where: wherObj,
        include: [{
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
          where: wherObjBrand,
          include: [{
            model:DBCountries,
            as: 'countries',
            where:wherObjBrandCountry
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
          where: wherObjAtt,
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
        }]
    })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(error => res.status(400).send(error));
  },
  // POST params: {"productIds":[]}
  getSomeProducts(req, res) {
    console.log("getSomeProducts.............")
    console.log(req.body)
    var wherObj = {id: {[Op.in]: req.body.productIds}};
    console.log("   wherObj ne")
    console.log(wherObj)
    return DBProducts
    .findAll({
        where: wherObj,
        include: [{
          model: DBBrands,
          as: 'brands',
          include: [{
            model:DBCountries,
            as: 'countries',
          }] 
          },{
          model: DBAttributes,
          as: 'attributes',
          through: {attributes: []},
          include: [{
            model:DBAttributeGroups,
            as: 'attributeGroups'
          }] 
        }]
    })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(error => res.status(400).send(error));
  }
};
