require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swag_controller = require('./controllers/swagController');
const auth_controller = require('./controllers/authController');
const cart_controller = require('./controllers/cartController');
const search_controller = require('./controllers/searchController');

const app = express();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swag_controller.read);

app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get('/api/user', auth_controller.getUser);

app.post('/api/cart/checkout', cart_controller.checkout);
app.post('/api/cart/:id', cart_controller.add);
app.delete('/api/cart/:id', cart_controller.delete);

app.get('/api/search', search_controller.search);

app.listen(process.env.SERVER_PORT, () => console.log('Listening on port ' + process.env.SERVER_PORT))