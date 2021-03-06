const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-node');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
    }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, ()=>{console.log(`App is running on port ${process.env.PORT}`);})