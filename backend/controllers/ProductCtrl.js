const DBProduct = require('../server/models').DBProduct;

module.exports = {
  create(req, res) {
    return DBProduct
      .create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId:req.body.categoryId
      })
      .then(p => res.status(201).send(p))
      .catch(error => res.status(400).send(error));
  },
  getAllOfCategory(req, res) {
        console.log(req.body);
        return DBProduct
        .findAll({
            where: {
                categoryId: req.params.categoryId
            }
        })
        .then(result => res.status(200).send(result))
        .catch(error => res.status(400).send(error));
  },
};
