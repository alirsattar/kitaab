const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;

const userSchema = new Schema({
    email:      String,
    password:   String,
    bookShelf:  [{type: Schema.Types.ObjectId, ref: 'Book'}],
    groups:     [{type: Schema.Types.ObjectId, ref: 'Group'}],
    reviews:    [{type: Schema.Types.ObjectId, ref: 'Review'}],
    comments:   [{type: Schema.Types.ObjectId, ref: 'Comment'}]},
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;