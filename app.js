require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
const cors = require("cors");    

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;


const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  cors({
    origin:['https://ironfood2.herokuapp.com', 'http://localhost:3000'],
    credentials: true,
  })
)

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);
    

const index = require('./routers/index');
app.use('/api', index);

const authRoutes = require('./routers/auth');
app.use('/api/auth', authRoutes);
 
const recipeRoutes = require('./routers/recipes');
app.use('/api/recipes', recipeRoutes)
app.use('*', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
module.exports = app;
