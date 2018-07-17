const express = require('express');
const router  = express.Router();
const Book    = require('../models/book');
const Group   = require('../models/group');
const User    = require('../models/user');
const axios   = require('axios');

/* GET home page */
router.get('/book/:id', (req, res, next) => {
  
    const theID = req.params.id;
    
    Book.findById(theID)
        .then((theBook)=>{
            axios.get(`https://www.googleapis.com/books/v1/volumes/${theBook.id}`)
                .then((googleResult)=>{
                    console.log(googleResult.data.volumeInfo);
                    res.render('books/viewBook', googleResult.data.volumeInfo);

                })
                .catch((err)=>{

                    console.log(err)

                });

        })
        .catch((err)=>{

            console.log(err);

        });
  
});

module.exports = router;