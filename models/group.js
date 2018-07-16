const mongoose                      = require('mongoose');
const Schema                        = mongoose.Schema;

const groupSchema = new Schema({
    owner:          {type: Schema.Types.ObjectId, ref: 'User'},
    name:           String,
    currentBook:    {type: Schema.Types.ObjectId, ref: 'Book'},
    pastBooks:      [{type: Schema.Types.ObjectId, ref: 'Book'}],
    members:        [{type: Schema.Types.ObjectId, ref: 'User'}],
    public:         Boolean,
    progress:       Number,
    memberReviews:  [{type: Schema.Types.ObjectId, ref: 'Review'}],
    memberComments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {timestamps: true}
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;