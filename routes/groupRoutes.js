
const express     = require('express');
const router      = express.Router();
const ensure      = require('connect-ensure-login');
const User        = require('../models/user');
const Book        = require('../models/book');
const Group       = require('../models/group');
const session     = require('express-session');

/* GET ROUTE FOR NEW GROUP PAGE */
router.get('/groups/new', ensure.ensureLoggedIn('/users/login'), (req, res, next) => {
  res.render('groups/new');
});

// POST ROUTE FOR NEW GROUP PAGE
router.post('/groups/create/',(req,res,next)=>{

    const theOwner              = req.user._id;
    const groupName             = req.body.name;
    const bookThumbnail         = req.body.bookThumbnail;
    const bookTitle             = req.body.bookTitle;
    const bookAuthor            = req.body.bookAuthor;
    const bookPagecount         = req.body.bookPagecount;
    const bookDescription       = req.body.bookDescription;

    Book.create({

      thumbnail:                bookThumbnail,
      title:                    bookTitle,
      author:                   bookAuthor,
      pagecount:                bookPagecount,
      description:              bookDescription

    })
      .then((theBook)=>{

        Group.create({

          owner:                theOwner,
          name:                 groupName,
          currentBook:          theBook._id,
          pastBooks:            [],
          members:              [],
          public:               false,
          progress:             0,
          memberReviews:        [],
          memberComments:       []

        })
          .then(theGroup=>{
              // console.log('the group: ', theGroup)

            User.findById(theOwner)
              .then(theUser=>{
                console.log('before: ', theUser)
                  theUser.groups.push(theGroup._id);
                  theUser.save()
                  .then((savedUser) => {
                    console.log('saved: ', savedUser)
                    res.redirect('/');
                  })
                  .catch(err => next(err));
              })
              .catch(err => next(err));

            // console.log(response);

          })
          .catch((err)=>{

            console.log(err);

          });

      });

});

module.exports = router;