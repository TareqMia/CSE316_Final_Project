const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }, 
        published: { type: Boolean, require: true },
        datePublished:  { type: Date, required: false},
        numberOfLikes:  { type: Number, required: false },
        numberOfDislikes: { type: Number, required: false }, 
        numberOfListens: { type: Number, required: false },
        comments: { type: [{
            user: String,
            comment: String 
        }], required: false },
        publishedBy: { type: String, required: false},
        publishedOn: { type: Date, required: false }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
