const app = require('express').Router()
const userModel=require('../models/users.model')
const bcrypt=require('bcrypt')

app.get('/signin', (req, res) => {
    res.render('signin.ejs',{isTrue:true,isEmail:false})
})

app.post('/handleSignin', async(req, res) => {
    console.log(req.body);
    let {email,password}=req.body;
const user=await userModel.findOne({ email })
console.log(user);
if(user !=null)
{
    const match = await bcrypt.compare(password, user.password);
    if(match)
    {
        res.redirect('/home')
    }
    else
    {
        res.render('signin.ejs',{isTrue:false,isEmail:false})
    }
    
}
else
{
    res.render('signin.ejs',{isEmail:true,isTrue:true})
}
   
});


module.exports = app