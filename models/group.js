const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;

const groupSchema = new Schema({
    currentBook:    [{type: Schema.Types.ObjectId, ref: 'Book'}],
    pastBooks:      [{type: Schema.Types.ObjectId, ref: 'Book'}],
    users:          [{type: Schema.Types.ObjectId, ref: 'User'}],
    progress:       String,
    memberReviews:  [{type: Schema.Types.ObjectId, ref: 'Review'}],
    memberComments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {timestamps: true}
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;