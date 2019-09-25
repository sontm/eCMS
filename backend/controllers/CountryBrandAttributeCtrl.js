const DBCountries = require('../server/models').DBCountries;
const DBBrands = require('../server/models').DBBrands;
const DBAttributeGroups = require('../server/models').DBAttributeGroups;
const DBAttributes = require('../server/models').DBAttributes;
const DBProductAttributes = require('../server/models').DBProductAttributes;
const DBDiscounts = require('../server/models').DBDiscounts;
const DBProducts = require('../server/models').DBProducts;

const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
  createCountry(req, res) {
    return DBCountries
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  createBrand(req, res) {
    return DBBrands
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  createAttributeGroup(req, res) {
    return DBAttributeGroups
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  createAttribute(req, res) {
    return DBAttributes
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  createProductAttribute(req, res) {
    return DBProductAttributes
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  getAllCountries(req, res) {
    console.log(req.body);
    return DBCountries
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
  getAllBrands(req, res) {
    console.log(req.body);
    return DBBrands
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
  getAllAttributeGroups(req, res) {
    console.log(req.body);
    return DBAttributeGroups
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
  getAllAttributes(req, res) {
    console.log(req.body);
    return DBAttributes
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
  getAllProductAttributes(req, res) {
    console.log(req.body);
    return DBProductAttributes
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },

  createDiscount(req, res) {
    return DBDiscounts
      .create(req.body)
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  getAllDiscounts(req, res) {
    console.log(req.body);
    return DBDiscounts
        .findAll()
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
  getBestDiscounts(req, res) {
    console.log ("getBestDiscounts calledddddddddddd")
    console.log(req.body);
    let nowDateTime = new Date(); // TODO: careful with this Now TImeZone
    return DBDiscounts
        .findAll({
          where:{
            'applyProductId' : {[Op.not]: 0},
            // from: {[Op.lte]: nowDateTime},
            //     [Op.and]: {
            //       to: {[Op.gte]: nowDateTime}
            //     }
          },
          order: [
            ['percent', 'DESC'],
            // ['fixMoney', 'ASC'],
          ],
          include: [{
            model:DBProducts, // Query associated product also
            as:'product'
          }],
          limit: 10
        })
        .then(result => {res.status(200).send(result)})
        .catch(error => res.status(400).send(error));
  },
};
