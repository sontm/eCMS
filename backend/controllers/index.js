const passport = require('passport');

import product from './ProductCtrl'
import category from './CategoryCtrl'
import countryBrandAttribute from './CountryBrandAttributeCtrl'
import auth from './AuthCtrl'
import user from './UserCtrl'
import userNproduct from './UserNProductCtrl'

module.exports = (app) => {
app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the PP!',
}));

app.post('/api/login', auth.login);
app.post('/api/login/facebook', user.registerFacebookLogin);
app.post('/api/login/google', user.registerGoogleLogin);



app.post('/api/roles', user.createRole);
app.get('/api/roles', user.getAllRoles);

app.post('/api/users', user.registerUser);
app.get('/api/users', user.getAllUsers);
// this request is Protected by JWT Authentication
app.get('/api/users/profile', passport.authenticate('jwt', {session: false}), user.getUserProfile);

app.post('/api/countries', countryBrandAttribute.createCountry);
app.get('/api/countries', countryBrandAttribute.getAllCountries);
app.post('/api/brands', countryBrandAttribute.createBrand);
app.get('/api/brands', countryBrandAttribute.getAllBrands);
app.post('/api/discounts', countryBrandAttribute.createDiscount);
app.get('/api/discounts', countryBrandAttribute.getAllDiscounts); 
app.get('/api/discounts/best', countryBrandAttribute.getBestDiscounts); 

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

app.get('/api/brand/:brandId', product.getProductsOfBrand);

app.get('/api/search/:keyword', product.searchProduct);

app.post('/api/categories', category.create);
app.get('/api/categories', category.getAll); // Get category List only

app.get('/api/categoriesFull', category.getAllWithProduct);
app.get('/api/categoriesFull/:id', category.getOneWithProduct);


app.post('/api/users/recentViews', passport.authenticate('jwt', {session: false}), userNproduct.addUserRecentViews);
app.get('/api/users/recentViews/:userId', passport.authenticate('jwt', {session: false}), userNproduct.getRecentViewsOfUser);
app.post('/api/users/favorites', passport.authenticate('jwt', {session: false}), userNproduct.addUserFavorite);
app.get('/api/users/favorites/:userId', passport.authenticate('jwt', {session: false}), userNproduct.getFavoritesOfUser);
app.post('/api/users/cart', passport.authenticate('jwt', {session: false}), userNproduct.addUserCartItem);
app.get('/api/users/cart/:userId', passport.authenticate('jwt', {session: false}), userNproduct.getUserCartItems);
app.post('/api/users/cart/removeItem', passport.authenticate('jwt', {session: false}), userNproduct.removeUserCartItem);

app.post('/api/users/address', passport.authenticate('jwt', {session: false}), user.addUserAddress);
app.get('/api/users/address/:userId', passport.authenticate('jwt', {session: false}), user.getAllAddressOfUser);
app.post('/api/users/address/edit', passport.authenticate('jwt', {session: false}), user.editUserAddress);
app.post('/api/users/address/setdefault', passport.authenticate('jwt', {session: false}), user.setUserDefault);

app.post('/api/users/order/place', passport.authenticate('jwt', {session: false}), userNproduct.placeOrder);
app.get('/api/users/order/:userId', passport.authenticate('jwt', {session: false}), userNproduct.getUserOrders);

};
