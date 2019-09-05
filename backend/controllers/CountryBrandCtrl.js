const DBCountries = require('../server/models').DBCountries;
const DBBrands = require('../server/models').DBBrands;

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
};
