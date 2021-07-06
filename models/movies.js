const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    streaming: { type: String, required: true },
    score: { type: String, required: true },
    hasSeen: Boolean
});

//the line that creates the collection in mongo
const playlist = mongoose.model('Playlist', playlistSchema);

module.exports = playlist;