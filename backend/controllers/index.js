import product from './ProductCtrl'
import category from './CategoryCtrl'
import countryBrandAttribute from './CountryBrandAttributeCtrl'

module.exports = (app) => {
app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the PP!',
}));

app.post('/api/countries', countryBrandAttribute.createCountry);
app.get('/api/countries', countryBrandAttribute.getAllCountries);
app.post('/api/brands', countryBrandAttribute.createBrand);
app.get('/api/brands', countryBrandAttribute.getAllBrands);
app.post('/api/discounts', countryBrandAttribute.createDiscount);
app.get('/api/discounts', countryBrandAttribute.getAllDiscounts); 

app.post('/api/attributes', countryBrandAttribute.createAttribute);
app.post('/api/productattributes', countryBrandAttribute.createProductAttribute);
app.post('/api/attributegroups', countryBrandAttribute.createAttributeGroup);
app.get('/api/attributes', countryBrandAttribute.getAllAttributes);
app.get('/api/productattributes', countryBrandAttribute.getAllProductAttributes);
app.get('/api/attributegroups', countryBrandAttribute.getAllAttributeGroups);

app.post('/api/products', product.create);
app.post('/api/products/query', product.queryProducts);
app.post('/api/products/get', product.getSomeProducts); // Get some products
app.get('/api/products', product.getAll);
app.get('/api/products/:productId', product.getProductDetail);
app.get('/api/products/OfCategory/:categoryId', product.getAllOfCategory);

app.post('/api/categories', category.create);
app.get('/api/categories', category.getAll); // Get category List only

app.get('/api/categoriesFull', category.getAllWithProduct);
app.get('/api/categoriesFull/:id', category.getOneWithProduct);

};
