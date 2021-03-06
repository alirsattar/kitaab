
const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;

const userSchema = new Schema({
    
    email:                  String,
    password:               String,
    name:                   String,
    avatar:                 {type: String, default:'/images/default-avatar.png'},
    bookProgress:           [{book:{type:Schema.Types.ObjectId,ref:'Book'},progress:Number}],
    bookShelf:              [{type: Schema.Types.ObjectId, ref: 'Book'}],
    groups:                 [{type: Schema.Types.ObjectId, ref: 'Group'}],
    reviews:                [{type: Schema.Types.ObjectId, ref: 'Review'}],
    comments:               [{type: Schema.Types.ObjectId, ref: 'Comment'}]},
    {  
        usePushEach: true
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// HOW TO PUSH INTO THE BOOKPROGRESS PROPERTY
// User.bookProgress.push({book:  some book objectID, progress: some progress # })