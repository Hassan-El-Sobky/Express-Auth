const app = require('express').Router()
const {check,validationResult}=require('express-validator')
const { insertMany } = require('../models/users.model')
const userModel=require('../models/users.model')
const bcrypt=require('bcrypt');
app.get('/', (req, res) => {
    res.render('signup.ejs',{errors:[],oldInputvalue:{fname:'',lname:'',email:'',password:'',rePassword:''}})
})

app.post('/handleSignUp', 
check('fname').matches(/[A-Z][a-z]*/),
check('lname').matches(/[A-Z][a-z]*/),
check('email').isEmail(),
check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
check('rePassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
async (req, res) => {
    console.log(req.body);
    let {fname,lname,email,password,rePassword}=req.body;
 const error=validationResult(req);
 console.log(error.array());
 console.log(error.isEmpty());
 const user= await userModel.findOne({email})
 console.log(user);
   if(error.isEmpty())
   {
       if(user == null)
       {
        bcrypt.hash(password, 7, async function(err, hash) {
            await userModel.insertMany({fname,lname,email,password:hash})
        res.redirect('/') 
        });
        
       }
       else
       {
        res.render('signup.ejs',{errors:[{param:'exists'}],oldInputvalue:{fname,lname,email,password,rePassword}})
          
       }
   }else{
    res.render('signup.ejs',{errors:error.array(),oldInputvalue:{fname,lname,email,password,rePassword}})
   }
});


module.exports = app