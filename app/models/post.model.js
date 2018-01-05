var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    id: Number,
    title: String,
    body:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);