
import "./db.js";
import express from "express";
import cors from "cors";
import {Song,TrendSong,userplaylist} from "./models/song.js";
import authrouter from "./routes/authrouter.js";
import authvalidjwt from "./middlewares/authvalidjwt.js"

console.log(`port from env = ${process.env.PORT} `);



const port=process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());


// 🔹 Fetch songs from MongoDB
app.get("/api/songs", async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

app.get("/api/trendsongs", async (req, res) => {
  const songs = await TrendSong.find();
  res.json(songs);
});



//user login/signup

app.use('/api/auth',authrouter);

app.get("/api/userplaylist", authvalidjwt, async (req, res) => {

  const userId = req.user._id;

  const playlists = await userplaylist.find({user: userId }).populate("songs");
  res.json(playlists);
});

app.post("/api/userplaylist", authvalidjwt, async (req, res) => {

  try {

    const { name } = req.body;

    // Check if playlist name was provided
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Playlist name is required",
        success: false
      });
    }

    // Create playlist for the logged-in user
    const playlist = new userplaylist({
      name: name.trim(),
      user: req.user._id,
      songs: []
    });

    // Save playlist in MongoDB
    await playlist.save();

    res.status(201).json({
      message: "Playlist created successfully",
      success: true,
      playlist: playlist
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Internal server error",
      success: false
    });

  }

});

// =========================================
// RENAME PLAYLIST
// =========================================

app.put(
  "/api/userplaylist/:playlistId",
  authvalidjwt,
  async (req, res) => {

    try {

      const { playlistId } = req.params;
      const { name } = req.body;


      // Check playlist name
      if (!name || name.trim() === "") {

        return res.status(400).json({
          message: "Playlist name is required",
          success: false
        });

      }


      // Find playlist belonging to logged-in user
      const playlist = await userplaylist.findOne({
        _id: playlistId,
        user: req.user._id
      });


      // Playlist not found
      if (!playlist) {

        return res.status(404).json({
          message: "Playlist not found",
          success: false
        });

      }


      // Update playlist name
      playlist.name = name.trim();


      // Save changes
      await playlist.save();


      // Send updated playlist
      res.status(200).json({

        message: "Playlist renamed successfully",

        success: true,

        playlist: playlist

      });


    } catch (error) {

      console.error(
        "Error renaming playlist:",
        error
      );


      res.status(500).json({

        message: "Internal server error",

        success: false

      });

    }

  }
);

app.delete(
    "/api/userplaylist/:playlistId/songs/:songId",
    authvalidjwt,
    async (req, res) => {

        try {

            const { playlistId, songId } = req.params;

            // Find playlist belonging to logged-in user
            const playlist = await userplaylist.findOne({
                _id: playlistId,
                user: req.user._id
            });

            if (!playlist) {

                return res.status(404).json({
                    message: "Playlist not found",
                    success: false
                });

            }


            // Remove song from playlist
            playlist.songs =
                playlist.songs.filter(
                    id => id.toString() !== songId
                );


            await playlist.save();


            res.status(200).json({
                message: "Song removed from playlist",
                success: true
            });


        } catch (error) {

            console.error(
                "Error removing song:",
                error
            );

            res.status(500).json({
                message: "Internal server error",
                success: false
            });

        }

    }
);

// Delete an entire playlist
app.delete(
  "/api/userplaylist/:playlistId",
  authvalidjwt,
  async (req, res) => {

    try {

      const { playlistId } = req.params;


      // Find and delete playlist belonging
      // to the logged-in user
      const playlist = await userplaylist.findOneAndDelete({
        _id: playlistId,
        user: req.user._id
      });


      // Playlist not found
      if (!playlist) {

        return res.status(404).json({
          message: "Playlist not found",
          success: false
        });

      }


      // Successfully deleted
      res.status(200).json({
        message: "Playlist deleted successfully",
        success: true
      });


    } catch (error) {

      console.error(
        "Error deleting playlist:",
        error
      );


      res.status(500).json({
        message: "Internal server error",
        success: false
      });

    }

  }
);


// Add a song to a playlist
app.post(
  "/api/userplaylist/:playlistId/songs",
  authvalidjwt,
  async (req, res) => {

    try {

      const { playlistId } = req.params;
      const { songId } = req.body;


      // Check song ID
      if (!songId) {
        return res.status(400).json({
          message: "Song ID is required",
          success: false
        });
      }


      // Find playlist belonging to logged-in user
      const playlist = await userplaylist.findOne({
        _id: playlistId,
        user: req.user._id
      });


      if (!playlist) {
        return res.status(404).json({
          message: "Playlist not found",
          success: false
        });
      }


      // Check that the song exists
      const song = await Song.findById(songId);


      if (!song) {
        return res.status(404).json({
          message: "Song not found",
          success: false
        });
      }


      // Prevent duplicate songs
      if (playlist.songs.includes(song._id)) {
        return res.status(400).json({
          message: "Song already exists in this playlist",
          success: false
        });
      }


      // Push song ID into playlist
      playlist.songs.push(song._id);


      // Save changes
      await playlist.save();


      res.status(200).json({
        message: "Song added to playlist successfully",
        success: true,
        playlist: playlist
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Internal server error",
        success: false
      });

    }
  }
);

// 🔹 Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
