const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const port = 3000
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(require('./routes/signup.routes'))
app.use(require('./routes/signin.routes'))
app.use(require('./routes/home.routes'))


mongoose.connect('mongodb://localhost:27017/notesDB', { useNewUrlParser: true, useUnifiedTopology: true })
app.listen(port, () => console.log(`Example app listening on port port!`))