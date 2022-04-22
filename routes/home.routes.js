const app = require('express').Router()

app.get('/home', (req, res) => {
    res.render('index.ejs')
});



app.get('/logout', (req, res) => {
    res.redirect('/signin')
});
module.exports = app