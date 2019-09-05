//import DBCategory from '../server/models/dbcategory' // This is NG, findAll is not function
const DBCategories = require('../server/models').DBCategories;
const DBProducts = require('../server/models').DBProducts;

module.exports = {
  create(req, res) {
    return DBCategories
      .create(req.body)
      .then(result => {
        res.status(201).send(result)
      })
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    return DBCategories
      .findAll()
      .then(result => {
        res.status(200).send(result)
      })
      .catch(error => res.status(400).send(error));
  },
  getAllWithProduct(req, res) {
    return DBCategories
      .findAll({
        include: [{
            model: DBProducts,
            as: 'productItems',
          }],
      })
      .then(result => res.status(200).send(result))
      .catch(error => res.status(400).send(error));
  },
  getOneWithProduct(req, res) {
    return DBCategories
        .findByPk(req.params.id, {
        include: [{
            model: DBProducts,
            as: 'productItems',
            }],
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  }
};
