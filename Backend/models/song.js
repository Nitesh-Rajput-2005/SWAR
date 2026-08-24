import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  audio: String,
  image: String
});

const playlistschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song"
    }
  ]

}, { timestamps: true });




const Song = mongoose.model("Song", songSchema);
const TrendSong = mongoose.model("Trending-Song", songSchema);
const userplaylist=mongoose.model("playlist",playlistschema)


 export  {Song, TrendSong,userplaylist};
 



