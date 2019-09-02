import product from './ProductCtrl'
import category from './CategoryCtrl'

module.exports = (app) => {
app.get('/api', (req, res) => res.status(200).send({
  message: 'Welcome to the PP!',
}));

app.post('/api/products', product.create);
app.get('/api/products/OfCategory/:categoryId', product.getAllOfCategory);

app.post('/api/categories', category.create);
app.get('/api/categories', category.getAll); // Get category List only

app.get('/api/categoriesFull', category.getAllWithProduct);
app.get('/api/categoriesFull/:id', category.getOneWithProduct);

};
