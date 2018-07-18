const express           = require('express');
const router            = express.Router();
const User              = require('../models/user');
const passport          = require('passport');
const session           = require('express-session');
const flash             = require('connect-flash');
const ensure            = require('connect-ensure-login');
const Book              = require('../models/book');
const Group             = require('../models/group');

// REQUIRING IN BCRYPT MODULE

const bcrypt = require('bcryptjs');

// GET ROUTE FOR SIGNUP PAGE

router.get('/users/signup', (req,res,next)=>{

    res.render('users/signupPage');

});

// GET ROUTE FOR LOGIN PAGE

router.get('/users/login', (req,res,next)=>{

    res.render('users/loginPage');

});

// POST ROUTE FOR LOGIN PAGE

router.post("/users/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true,
        passReqToCallback: true
      }));

// POST ROUTE FOR CREATING A NEW ACCOUNT + FILTERS TO CHECK FOR EMPTY FIELDS AND UNIQUE 

router.post('/users/signup', (req,res,next)=>{

    const theName = req.body.name;
    const theUsername = req.body.email;
    const thePassword = req.body.password;

    if(thePassword === "" || theUsername === ""){

        res.render('users/signupPage', {errorMessage: 'FILL IN ALL FIELDS - OR ELSE'});
        return;

    }

    User.findOne({username: theUsername})
        .then((response)=>{

            if (response !== null){

                res.render('users/signupPage', {errorMessage: `Sorry, the username ${theUsername} is not available.`});
                return;

            }


            const salt = bcrypt.genSaltSync(10);
            
            const hashedPassword = bcrypt.hashSync(thePassword, salt);

            User.create({name: theName, email: theUsername, password: hashedPassword})
                .then((user)=>{
                    req.login(user, (err)=>{
                        if(err){
                            next(err);
                            return;
                        }
                        res.redirect('/');
                    });
                })
                .catch((err)=>{
                    console.log(err);
                    next(err);
                });
        });
});

// GET ROUTE FOR LOGGING OUT -- COULD ALSO BE A POST ROUTE

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // cannot access session here
      res.redirect("/");
    });
});

/* GET ROUTE FOR MY GROUPS PAGE */
router.get('/users/groups', ensure.ensureLoggedIn('/users/login'), (req, res, next) => {
    
    User.findById(req.user._id)
    .populate({path:'groups', populate: {path: 'currentBook members owner'}})
    // .populate({path:'groups', populate: {path: 'members'}})
    // .populate({path:'groups', populate: {path: 'owner'}})
        .then((theUser)=>{

            res.render('users/userGroups', theUser);

        })
    .catch((err)=>{
  
          console.log(err);
  
    });
});

// GET ROUTE FOR USER PROFILE PAGE

router.get('/users/edit/:id', (req,res,next)=>{

    const theID = req.params.id;
    
    res.render('users/userEdit');

});

// GET ROUTE FOR USER PROFILE PAGE

router.get('/users/:id', (req,res,next)=>{

    const theID = req.params.id;
    
    res.render('users/userProfile');

});


module.exports = router;