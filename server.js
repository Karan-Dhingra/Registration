const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const bcrypt = require('bcrypt')
const User = require('./modals/user')

// Mongo Connection
const url = ' mongodb://localhost/database_name'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...')
}).catch((err) => {
    console.log('Connection failed...')
});


// Set template engine
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extend: false }))
app.use(express.json())
app.use(expressLayout)
app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    return res.render('layout')
})

app.post('/register', (req, res) => {
    // Create a user 
    console.log("Password");
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.save().then((user) => {
        // Login
        console.log(user)
        return res.redirect('/')
    }).catch(err => {
        console.log(err);
        console.log('Something went wrong');
        return res.redirect('/')
    })
})


app.listen(3220, () => {
    console.log(`Listening on port 3220`)
})