const express = require('express');
const router  = express.Router();

/* GET ROUTE FOR NEW GROUP PAGE */
router.get('/groups/new', (req, res, next) => {
  res.render('groups/new');
});

// POST ROUTE FOR NEW GROUP PAGE
router.post('/groups/create/:id', (req,res,next)=>{
    
    res.send(req.body);
    
    // const userInput = req.body;
    
    // const newGroup = new Group({
        
    //     name:               userInput.name,
    //     visibility:         userInput.visibility


    // });
    
    // Movie.create(newMovie)
    //     .then((response)=>{

    //         res.redirect(`/movies/${response._id}`);

    //     })
    //     .catch((err)=>{

    //         next(err);

    //     });

});

module.exports = router;