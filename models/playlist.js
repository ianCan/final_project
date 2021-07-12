const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pic: { type: String, required: true },
    tracks: { type: String, required: true },
});

//the line that creates the collection in mongo
const playlist = mongoose.model('Playlist', playlistSchema);

module.exports = playlist;