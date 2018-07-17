
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

/* GET ROUTE FOR NEW GROUP PAGE */
router.get('/groups/edit/:id', ensure.ensureLoggedIn('/users/login'), (req, res, next) => {
  
  const theID = req.params.id;
  
  Group.findById(theID)
    .then((theGroup)=>{

      res.render('groups/editGroup', theGroup);

    })
    .catch((err)=>{

      next(err);

    });
  
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
    const bookID                = req.body.bookID;
    const bookRating            = req.body.bookRating;

    Book.create({

      thumbnail:                bookThumbnail,
      title:                    bookTitle,
      author:                   bookAuthor,
      pagecount:                bookPagecount,
      description:              bookDescription,
      id:                       bookID,
      rating:                   bookRating

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
                  let bookId = theBook._id;
                  let progress = 0;
                  theUser.booksProgress.push({bookId, progress});
                  console.log(theUser.booksProgress);
                  theUser.save()
                  .then((savedUser) => {
                    console.log('saved: ', savedUser);
               
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