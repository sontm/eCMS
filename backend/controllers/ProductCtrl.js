const DBProducts = require('../server/models').DBProducts;
const DBBrands = require('../server/models').DBBrands;
const DBCountries = require('../server/models').DBCountries;
const DBAttributes = require('../server/models').DBAttributes;
const DBAttributeGroups = require('../server/models').DBAttributeGroups;

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
      return DBProducts
      .findByPk(req.params.productId)
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  }
};
