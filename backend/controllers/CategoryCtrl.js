//import DBCategory from '../server/models/dbcategory' // This is NG, findAll is not function
const DBCategory = require('../server/models').DBCategory;
const DBProduct = require('../server/models').DBProduct;

module.exports = {
  create(req, res) {
    return DBCategory
      .create({
        name: req.body.name,
      })
      .then(result => res.status(201).send(result))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    return DBCategory
      .findAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  getAllWithProduct(req, res) {
    return DBCategory
      .findAll({
        include: [{
            model: DBProduct,
            as: 'productItems',
          }],
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  getOneWithProduct(req, res) {
    return DBCategory
        .findByPk(req.params.id, {
        include: [{
            model: DBProduct,
            as: 'productItems',
            }],
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  }
};
