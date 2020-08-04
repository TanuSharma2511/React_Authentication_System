const express = require('express');
const router = express.Router();
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require("../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");


//For Testing Purpose
router.get('/test', async (req, res) => {
  res.send("hello users")
});


//Register User
//Public Route
router.post("/register",(req,res) =>{
    const { errors,isValid } = validateRegisterInput(req.body);
    console.log(errors);
    //Check Validation
    if(!isValid){
      return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email})
    .then(user =>{
        if(user){
            errors.email = "Email already exist";
            return res.status(400).json(errors);
        }else{
           
            const newUser= new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(newUser.password,salt, (err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user =>{
                        res.json(user)
                    })
                    .catch(err => console.log(err))
                })
            })
        }
    })
})


//user login
//Public Route
router.post("/login",(req,res) =>{

    const { errors,isValid } = validateLoginInput(req.body);

    //Check Validation
    if(!isValid){
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
 
    //Find the user by email
    User.findOne({email})
    .then(user =>{
        console.log(user);
        //Check for user
        if(!user){
            errors.email = "User not found";
            return res.status(404).json(errors);
        }
        //Check Password
        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(isMatch){
               //User Matched

               const payload = { id:user.id, name:user.name ,email: user.email} //JWT Payload
               //Sign Token
               jwt.sign(payload, 
                keys.secretOrKey ,
                { expiresIn:3600 },
                (err,token) => {
                    res.json({
                        success:true,
                        token:"Bearer " + token
                    })
                })
            }else{
                errors.password = "Password Incorrect";
                return res.status(400).json(errors); 
            }
        });
    });
 });

router.get('/current' , passport.authenticate('jwt', {session: false}), (req,res) =>{
    // res.json({msg:"Success"});
    res.json({
       id:req.user.id,
       name:req.user.name,
       email:req.user.email
    });
})

module.exports = router;
