
const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;

const commentSchema = new Schema({
    group:          {type: Schema.Types.ObjectId, ref: 'Group'},
    book:           {type: Schema.Types.ObjectId, ref: 'Book'},
    author:         {type: Schema.Types.ObjectId, ref: 'User'},
    content:        String
    },
    {
        usePushEach: true
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;