const express = require("express");
const app = express();
const bodyP = require("body-parser");
const mongoose = require('mongoose');
const options = { static: true };

const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport =  require('passport');
const LocalStrategy =  require('passport-local');
const User = require('./models/User');
const seedDB = require('./seed');
const MongoStore = require('connect-mongo');
const wishlistRoutes = require('./routes/wishlist');

const dbURL = 'mongodb://127.0.0.1:27017/Health-Support';

app.use(bodyP.json());

const path = require('path');

// Set the view engine to ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

// Set the views directory to 'Frontend'
app.set('views', path.join(__dirname, 'Frontend'));

// Serve static assets
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/Frontend', express.static(path.join(__dirname, 'Frontend')));
app.use('/Home', express.static(path.join(__dirname, 'Frontend', 'Home')));
app.use('/Components', express.static(path.join(__dirname, 'Frontend', 'Components')));
app.use('/Contact', express.static(path.join(__dirname, 'Frontend', 'Contact')));
app.use('/Resources', express.static(path.join(__dirname, 'Frontend', 'Resources')));
app.use('/Plans', express.static(path.join(__dirname, 'Frontend', 'Plans')));
app.use('/Resource_Pdfs', express.static(path.join(__dirname, 'Frontend', 'Resource_Pdfs')));
app.use('/Images', express.static(path.join(__dirname, 'Frontend', 'Images')));
app.use('/layouts', express.static(path.join(__dirname, 'Frontend', 'layouts')));
app.use('/output.css', express.static(path.join(__dirname, 'Frontend', 'output.css')));
app.use('/tailwind.config.js', express.static(path.join(__dirname, 'tailwind.config.js')));

// Route Handlers
app.get('/', function (req, res) {
    res.render("Home/index");
});

app.get('/contact', (req, res) => {
    res.render("Contact/Contact"); 
});

app.get('/resources', (req, res) => {
    res.render("Resources/Resources"); 
});

app.get('/plans', (req, res) => {
    res.render("Plans/plans"); 
});

mongoose.set('strictQuery', true);
mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let secret = 'weneedabettersecretkey';

let store = MongoStore.create({
    secret: secret,
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60
});

const sessionConfig = {
    store: store,
    name: 'bhaukaal',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// seedDB();

// Routes require
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');


app.use('/wishlist', wishlistRoutes);


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cartRoutes);
app.use(productRoutes);



app.get('/user/cart/placed', (req, res) => {
    res.render('placed');
});

// Middle express
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);





// Error Handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(8001, () => { 
    console.log("http://127.0.0.1:8001");
});
