
let currentaudio = null;

function changeImage(img) {
    let music = document.querySelector(".music");
    music.style.display = "grid";
    let right = document.querySelector(".right");
    right.style.gridtemplaterows = " minmax(0,1fr) 100px";
    let card = img.closest(".music-card");
    let audio = card.querySelector(".music1");
    currentaudio = audio;
    currentaudio.volume = currentVolume;
    attachProgress(currentaudio);

    if ((img.src.includes("ause.svg"))) {
        img.src = "https://www.svgrepo.com/show/522226/play.svg";
        document.querySelector(".allplay").src = "https://www.svgrepo.com/show/522226/play.svg";
        currentaudio.pause();
    }

    else {

        document.querySelectorAll(".music1").forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        document.querySelectorAll(".play").forEach(icon => {
            icon.src = "https://www.svgrepo.com/show/522226/play.svg";
        });
        document.querySelectorAll(".play-svg").forEach(icon => {
            icon.src = "svg/play.svg";
        });
        img.src = "https://www.svgrepo.com/show/535553/pause.svg";
        document.querySelector(".allplay").src = "https://www.svgrepo.com/show/535553/pause.svg";
        currentaudio.play();
    }
}

function changeIcon(icon) {

    let music = document.querySelector(".music");
    music.style.display = "grid";
    let right = document.querySelector(".right");
    right.style.gridtemplaterows = " minmax(0,1fr) 100px";

    let card = icon.closest(".card");
    let audio = card.querySelector(".music1");
    let img = icon.querySelector(".play-svg")
    currentaudio = audio;
    currentaudio.volume = currentVolume;
    attachProgress(currentaudio);

    if ((img.src.includes("svg/pause.svg"))) {
        img.src = "svg/play.svg";
        document.querySelector(".allplay").src = "https://www.svgrepo.com/show/522226/play.svg";

        currentaudio.pause();
    }

    else {

        document.querySelectorAll(".music1").forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        document.querySelectorAll(".play-svg").forEach(icon => {
            icon.src = "svg/play.svg";
        });
        document.querySelectorAll(".play").forEach(icon => {
            icon.src = "https://www.svgrepo.com/show/522226/play.svg";
        });
        img.src = "svg/pause.svg";
        document.querySelector(".allplay").src = "https://www.svgrepo.com/show/535553/pause.svg";
        currentaudio.play();
    }
}

function change(img) {
    if ((img.src.includes("ause.svg"))) {
        img.src = "https://www.svgrepo.com/show/522226/play.svg";
        currentaudio.pause();
        document.querySelectorAll(".play-svg").forEach(icon => {
            icon.src = "svg/play.svg";
        });
        document.querySelectorAll(".play").forEach(icon => {
            icon.src = "https://www.svgrepo.com/show/522226/play.svg";
        });
    }
    else {
        img.src = "https://www.svgrepo.com/show/535553/pause.svg";
        currentaudio.play();

    }
}

// trending song card


let Trendsongs;
const TrendContainer = document.getElementById("Trending-music-container");

fetch("http://localhost:5000/api/Trendsongs")
    .then(res => res.json())
    .then(Trendsongss => {
        Trendsongs = Trendsongss;
        Trendsongss.forEach((song, index) => {
            const card = document.createElement("div");
            card.className = "card border";

            card.innerHTML = `
    <audio  data-index="${index}" data-type="trend" class="music1" src="songs/${song.audio}"></audio>
    <div style="width:100%;height:70%;position:relative;">
      <img style="width:99%;height:99%;" src="${song.image}">
      <div onclick="changeIcon(this)" class="play-icon">
        <img data-index="${index}" data-type="trend" class="play-svg invert" src="svg/play.svg">
      </div>
    </div>
    <div>
      <div style="padding:10px 0;text-overflow: ellipsis;white-space: nowrap;
            overflow: hidden;">${song.title}</div>
      <div style="color:rgb(181,180,180);text-overflow: ellipsis;white-space: nowrap;
            overflow: hidden;">${song.artist}</div>
    </div>
  `;

            TrendContainer.appendChild(card);
        });
    });

let repeat = 0;

function repeatsong(img) {
    if (img.src.includes("https://www.svgrepo.com/show/478675/shuffle-3.svg")) {
        img.src = "https://www.svgrepo.com/show/404053/repeat-button.svg";
        repeat = 1;
    }
    else {
        img.src = "https://www.svgrepo.com/show/478675/shuffle-3.svg";
        repeat = 0;
    }

};

//simple music card
let songs;
const container = document.getElementById("music-container");

fetch("http://localhost:5000/api/songs")
    .then(res => res.json())
    .then(songss => {
        songs = songss;

        songss.forEach((song, index) => {
            const card = document.createElement("div");
            card.className = "music-card ";
            //             card.innerHTML = ` 


            //     <img style="width:50px;height:50px;border-radius: 10px;"
            //         src="${song.image}">
            //         <audio  data-index="${index}" data-type="simple" class="music1" src="songs/${song.audio}"></audio>
            //         <div style="font-size:12px;">
            //             <div style="font-weight:600;white-space: nowrap;text-overflow: ellipsis;
            //             overflow: hidden;">${song.title}</div>
            //             <div style="color:rgb(180,180,180);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
            //                ${song.artist}
            //             </div>
            //         </div>
            //         <img data-index="${index}" data-type="simple" onclick="changeImage(this)" class="music-icon invert play cursor" style="width:20px;height:20px;"
            //             src="https://www.svgrepo.com/show/522226/play.svg" alt="">



            //    `;


            card.innerHTML = `

    <!-- Song image -->
    <img
        style="width:50px;height:50px;border-radius:10px;"
        src="${song.image}"
    >

    <!-- Audio -->
    <audio
        data-index="${index}"
        data-type="simple"
        class="music1"
        src="songs/${song.audio}">
    </audio>

    <!-- Song information -->
    <div
        style="
            font-size:12px;
            flex:1;
            min-width:0;
        "
    >

        <div
            style="
                font-weight:600;
                white-space:nowrap;
                text-overflow:ellipsis;
                overflow:hidden;
            "
        >
            ${song.title}
        </div>

        <div
            style="
                color:rgb(180,180,180);
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            "
        >
            ${song.artist}
        </div>

    </div>


    <!-- Three dot menu -->
    <div
        class="song-menu-wrapper"
    >

        <button
            class="song-menu-btn"
            onclick="toggleSongMenu(event, ${index})"
        >
            ⋮
        </button>


        <!-- Small menu -->
        <div
            class="song-menu"
            id="song-menu-${index}"
        >

            <div
                class="song-menu-option"
                onclick="addSongToPlaylist(event, ${index})"
            >
                Add to Playlist
            </div>

        </div>

    </div>


    <!-- Play button -->
    <img
        data-index="${index}"
        data-type="simple"
        onclick="changeImage(this)"
        class="music-icon invert play cursor"
        style="
            width:20px;
            height:20px;
            flex-shrink:0;
        "
        src="https://www.svgrepo.com/show/522226/play.svg"
        alt=""
    >

`;

            container.appendChild(card);
        });
    });


setInterval(() => {
    if (!currentaudio) return;

    let timespan = document.querySelector(".timespan");
    timespan.innerHTML = `
        <span>${formatTime(currentaudio.currentTime)}</span> /
        <span>${formatTime(currentaudio.duration)}</span>
    `;

    if ((currentaudio.currentTime == currentaudio.duration) && (!repeat)) {
        forward(this);
    }
    else if ((currentaudio.currentTime == currentaudio.duration) && (repeat)) {
        currentaudio.currentTime = 0;
        currentaudio.play();

    }

}, 500);

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}




const progressBar = document.querySelector(".time");
const point = document.querySelector(".point");
const lapse = document.querySelector(".lapse");

function attachProgress(audio) {
    audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;

        const percent = audio.currentTime / audio.duration;
        const barWidth = progressBar.offsetWidth;


        lapse.style.width = percent * barWidth + "px";
        point.style.left =
            progressBar.offsetLeft + percent * barWidth - point.offsetWidth / 2 + "px";
    });
}

progressBar.addEventListener("click", (e) => {
    if (!currentaudio) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    currentaudio.currentTime = percent * currentaudio.duration;
});


function forward(forward) {
    if (!currentaudio) return;

    const index = Number(currentaudio.dataset.index);
    const type = currentaudio.dataset.type;

    let list;

    if (type === "trend") {

        list = Trendsongs;

    }
    else if (type === "playlist") {

        list = currentPlaylist.songs;

    }
    else {

        list = songs;

    }

    const nextIndex = (index + 1) % list.length;

    const nextAudio = document.querySelector(
        `.music1[data-index="${nextIndex}"][data-type="${type}"]`
    );


    if (!nextAudio) return;

    currentaudio.pause();
    currentaudio.currentTime = 0;
    currentaudio = nextAudio;
    attachProgress(currentaudio);
    currentaudio.play();
    currentaudio.volume = currentVolume;
    const img = document.querySelector(".allplay");
    img.src = "https://www.svgrepo.com/show/535553/pause.svg";
    document.querySelectorAll(".play-svg").forEach(icon => {
        icon.src = "svg/play.svg";
    });
    document.querySelectorAll(".play").forEach(icon => {
        icon.src = "https://www.svgrepo.com/show/522226/play.svg";
    });

    if (type === "trend") {
        let icon = document.querySelector(
            `.play-svg[data-index="${nextIndex}"][data-type="${type}"]`);
        icon.src = "svg/pause.svg";
    }
    else {
        let icon = document.querySelector(
            `.play[data-index="${nextIndex}"][data-type="${type}"]`);
        icon.src = "https://www.svgrepo.com/show/535553/pause.svg";
    }
}


function backward(backward) {
    if (!currentaudio) return;

    const index = Number(currentaudio.dataset.index);
    const type = currentaudio.dataset.type;

    let list;

    if (type === "trend") {

        list = Trendsongs;

    }
    else if (type === "playlist") {

        list = currentPlaylist.songs;

    }
    else {

        list = songs;

    }

    const nextIndex = (index - 1 + list.length) % list.length;

    const nextAudio = document.querySelector(
        `.music1[data-index="${nextIndex}"][data-type="${type}"]`
    );



    if (!nextAudio) return;

    currentaudio.pause();
    currentaudio.currentTime = 0;
    currentaudio = nextAudio;
    attachProgress(currentaudio);
    currentaudio.play();
    currentaudio.volume = currentVolume;
    const img = document.querySelector(".allplay");
    img.src = "https://www.svgrepo.com/show/535553/pause.svg";
    document.querySelectorAll(".play-svg").forEach(icon => {
        icon.src = "svg/play.svg";
    });
    document.querySelectorAll(".play").forEach(icon => {
        icon.src = "https://www.svgrepo.com/show/522226/play.svg";
    });

    if (type === "trend") {
        let icon = document.querySelector(
            `.play-svg[data-index="${nextIndex}"][data-type="${type}"]`);
        icon.src = "svg/pause.svg";
    }
    else {
        let icon = document.querySelector(
            `.play[data-index="${nextIndex}"][data-type="${type}"]`);
        icon.src = "https://www.svgrepo.com/show/535553/pause.svg";
    }
}


const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    document.querySelectorAll(".music-card").forEach(card => {
        const title = card.querySelector("div div")?.innerText.toLowerCase();
        const artist = card.querySelector("div div + div")?.innerText.toLowerCase();

        if (
            title.includes(query) ||
            artist.includes(query)
        ) {
            card.style.display = "grid";
        } else {
            card.style.display = "none";
        }
    });
    document.querySelectorAll(".card.border").forEach(card => {
        const title = card.innerText.toLowerCase();

        if (title.includes(query)) {
            card.style.display = "inline-block";
        } else {
            card.style.display = "none";
        }
    });

});

function home(div) {

    // Clear main song search
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));

    // Clear playlist search
    playlistSearchInput.value = "";
    playlistSearchInput.dispatchEvent(new Event("input"));

    showHome();
}

let v;

function silentornot(img) {


    if (img.src.includes("high.svg")) {
        img.src = "https://www.svgrepo.com/show/535729/volume-x.svg";
        v = currentaudio.volume;
        setVolume(0);
    }
    else {
        img.src = "https://www.svgrepo.com/show/535722/volume-high.svg";
        setVolume(v);
    }

}

const volumeBar = document.querySelector(".volume-bar");
const volumeFill = document.querySelector(".volume-fill");
const volumePoint = document.querySelector(".volumepoint");

let currentVolume = 1;

function setVolume(percent) {
    if (percent != 0)
        document.querySelector(".volumeicon").src = "https://www.svgrepo.com/show/535722/volume-high.svg";
    percent = Math.max(0, Math.min(1, percent));
    currentVolume = percent;

    if (currentaudio) {
        currentaudio.volume = percent;
    }

    const barWidth = volumeBar.offsetWidth;




    volumeFill.style.width = percent * barWidth + "px";
    volumeFill.style.right = (1 - percent) * barWidth + 5 + "px";


    volumePoint.style.right =
        5 + (1 - percent) * barWidth - volumePoint.offsetWidth / 2 + "px";
}



// CLICK on volume bar
volumeBar.addEventListener("click", (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    setVolume(percent);
});

function gologin() {
    window.location.href = "login.html";
}





const rightGrid = document.getElementById("rightGrid");

const playlistSection = document.getElementById("playlistSection");

const trendingContainer =
    document.getElementById("Trending-music-container");

const seeAllBtn =
    document.getElementById("seeAllBtn");

const playlistBtn =
    document.getElementById("playlistBtn");

function showTrending() {

    playlistSection.style.display = "none";

    rightGrid.style.gridTemplateRows =
        "70px minmax(0,1fr)";

    trendingContainer.style.flexWrap = "wrap";





    seeAllBtn.style.display = "none";

    playlistBtn.style.display = "block";

}

function showHome() {

    playlistSection.style.display = "grid";

    rightGrid.style.gridTemplateRows =
        "70px 230px minmax(0,1fr)";

    trendingContainer.style.flexWrap = "nowrap";




    playlistBtn.style.display = "none";

    seeAllBtn.style.display = "block";

}








function togglePlaylistModal() {

    const modal =
        document.getElementById("playlist-modal");

    if (modal.style.display === "flex") {

        modal.style.display = "none";

        return;
    }


    modal.style.display = "flex";

    document
        .getElementById("playlist-name")
        .focus();
}



async function createPlaylist() {

    if (playlistModalMode !== "create") {
        return;
    }



    const input = document.getElementById("playlist-name");

    const playlistName = input.value.trim();

    if (playlistName === "") {
        alert("Please enter a playlist name");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/userplaylist",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    "Authorization":
                        "Bearer " + localStorage.getItem("token")
                },

                body: JSON.stringify({
                    name: playlistName
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Failed to create playlist");

            return;
        }


        // Playlist successfully saved in MongoDB
        const playlist = data.playlist;



        // Get playlist container
        const container =
            document.getElementById("playlist-container");


        // Create card
        const card =
            document.createElement("div");

        card.classList.add("playlist-user-card");


        // Card content
        card.innerHTML = `

    <div class="playlist-cover-grid">

        <div class="playlist-cover-item">
            ${playlist.songs[0]
                ? `<img src="${playlist.songs[0].image}" alt="">`
                : `<div class="empty-cover">🎵</div>`
            }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[1]
                ? `<img src="${playlist.songs[1].image}" alt="">`
                : `<div class="empty-cover">🎵</div>`
            }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[2]
                ? `<img src="${playlist.songs[2].image}" alt="">`
                : `<div class="empty-cover">🎵</div>`
            }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[3]
                ? `<img src="${playlist.songs[3].image}" alt="">`
                : `<div class="empty-cover">🎵</div>`
            }
        </div>

    </div>

    <div class="playlist-card-info">

    <h3>${playlist.name}</h3>

    <button
        class="playlist-menu-btn"
        onclick="togglePlaylistMenu(event, '${playlist._id}')"
    >
        ⋮
    </button>

</div>

<p>${playlist.songs.length} songs</p>

 <div
        class="playlist-menu"
        id="playlist-menu-${playlist._id}"
    >

        <div
            class="playlist-menu-option"
            onclick="renamePlaylist(event, '${playlist._id}')"
        >
            Rename playlist
        </div>

        <div
            class="playlist-menu-option delete-option"
            onclick="deletePlaylist(event, '${playlist._id}')"
        >
            Delete playlist
        </div>

    </div>

`;


        // Add card to page
        document.getElementById("playlist-container").style.display = "flex";
        container.appendChild(card);

        console.log("done");
        // Hide empty message
        document.getElementById("empty-playlist").style.display = "none";


        // Show + button
        document.getElementById("add-playlist-btn").style.display = "flex";


        resetPlaylistModal();

        togglePlaylistModal();


    } catch (error) {

        console.error("Error creating playlist:", error);

        alert("Could not connect to server");
    }
}

async function loadPlaylists() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/userplaylist",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        "Bearer " + localStorage.getItem("token")
                }
            }
        );


        const playlists = await response.json();


        if (!response.ok) {

            console.log(playlists.message);

            return;
        }





        const container =
            document.getElementById("playlist-container");


        // Remove old cards before loading
        container.innerHTML = "";


        // If no playlists exist
        if (playlists.length === 0) {

            document.getElementById("empty-playlist").style.display = "block";

            document.getElementById("add-playlist-btn").style.display = "none";

            return;
        }


        // Playlists exist
        document.getElementById("empty-playlist").style.display = "none";

        document.getElementById("add-playlist-btn").style.display = "flex";
        document.getElementById("playlist-container").style.display = "flex";


        // Create card for every playlist
        playlists.forEach(playlist => {

            const card = document.createElement("div");

            card.classList.add("playlist-user-card");

            card.innerHTML = `

    <div class="playlist-cover-grid">

        <div class="playlist-cover-item">
            ${playlist.songs[0]
                    ? `<img src="${playlist.songs[0].image}" alt="">`
                    : `<div class="empty-cover">🎵</div>`
                }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[1]
                    ? `<img src="${playlist.songs[1].image}" alt="">`
                    : `<div class="empty-cover">🎵</div>`
                }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[2]
                    ? `<img src="${playlist.songs[2].image}" alt="">`
                    : `<div class="empty-cover">🎵</div>`
                }
        </div>

        <div class="playlist-cover-item">
            ${playlist.songs[3]
                    ? `<img src="${playlist.songs[3].image}" alt="">`
                    : `<div class="empty-cover">🎵</div>`
                }
        </div>

    </div>

    <div class="playlist-card-info">

    <h3>${playlist.name}</h3>

    <button
        class="playlist-menu-btn"
        onclick="togglePlaylistMenu(event, '${playlist._id}')"
    >
        ⋮
    </button>

</div>

    <p>${playlist.songs.length} songs</p>

     <div
        class="playlist-menu"
        id="playlist-menu-${playlist._id}"
    >

        <div
            class="playlist-menu-option"
            onclick="renamePlaylist(event, '${playlist._id}')"
        >
            Rename playlist
        </div>

        <div
            class="playlist-menu-option delete-option"
            onclick="deletePlaylist(event, '${playlist._id}')"
        >
            Delete playlist
        </div>

    </div>

`;


            card.addEventListener("click", function (event) {

                // VERY IMPORTANT
                event.stopPropagation();


                // =====================================
                // ADD TO PLAYLIST MODE
                // =====================================

                if (isAddingSongToPlaylist) {

                    selectedPlaylistForSong = playlist;

                    console.log(
                        "Selected playlist:",
                        selectedPlaylistForSong
                    );


                    // Show Add Song popup
                    showAddSongPopup();


                    return;
                }


                // NORMAL MODE

                openPlaylistSongs(playlist);

            });


            container.appendChild(card);

        });


    } catch (error) {

        console.error("Error loading playlists:", error);

    }
}
loadPlaylists();

loadPlaylists();


// =========================================
// PLAYLIST SEARCH
// =========================================

const playlistSearchInput =
    document.getElementById("playlist-search-input");

playlistSearchInput.addEventListener("input", () => {

    const query =
        playlistSearchInput.value.toLowerCase().trim();

    document
        .querySelectorAll(".playlist-user-card")
        .forEach(card => {

            const playlistName =
                card.querySelector("h3")?.innerText
                    .toLowerCase() || "";

            if (playlistName.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

});

let currentPlaylist = null;
let playlistModalMode = "create";
let renamePlaylistId = null;

function openPlaylistSongs(playlist) {

    currentPlaylist = playlist;

    console.log("Opening playlist:", playlist.name);
    console.log("Songs in playlist:", playlist.songs);


    // Hide playlist cards
    const playlistContainer =
        document.getElementById("playlist-container");

    playlistContainer.style.display = "none";


    // Show playlist songs section
    const songContainer =
        document.getElementById("playlist-song-container");

    songContainer.style.display = "grid";


    // Set playlist name
    document.getElementById(
        "opened-playlist-name"
    ).innerText = playlist.name;


    // IMPORTANT:
    // Clear ONLY the song list
    const songList =
        document.getElementById("playlist-song-list");

    songList.innerHTML = "";


    // Create songs
    playlist.songs.forEach((song, index) => {

        const card = document.createElement("div");

        card.className = "music-card";


        card.innerHTML = `

            <img
                style="width:50px;height:50px;border-radius:10px;"
                src="${song.image}"
            >

            <audio
                data-index="${index}"
                data-type="playlist"
                class="music1"
                src="songs/${song.audio}">
            </audio>

            <div
                style="
                    font-size:12px;
                    flex:1;
                    min-width:0;
                "
            >

                <div
                    style="
                        font-weight:600;
                        white-space:nowrap;
                        text-overflow:ellipsis;
                        overflow:hidden;
                    "
                >
                    ${song.title}
                </div>

                <div
                    style="
                        color:rgb(180,180,180);
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    "
                >
                    ${song.artist}
                </div>

            </div>


            <div class="song-menu-wrapper">

                <button
                    class="song-menu-btn"
                    onclick="togglePlaylistSongMenu(event, ${index})"
                >
                    ⋮
                </button>

                <div
                    class="song-menu"
                    id="playlist-song-menu-${index}"
                >

                    <div
                        class="song-menu-option"
                        onclick="removeSongFromPlaylist(event, ${index})"
                    >
                        Remove from Playlist
                    </div>

                </div>

            </div>


            <img
                data-index="${index}"
                data-type="playlist"
                onclick="changeImage(this)"
                class="music-icon invert play cursor"
                style="
                    width:20px;
                    height:20px;
                    flex-shrink:0;
                "
                src="https://www.svgrepo.com/show/522226/play.svg"
                alt=""
            >

        `;


        // IMPORTANT
        songList.appendChild(card);

    });

}

function showPlaylistCards() {

    // Stop playlist song view
    document.getElementById(
        "playlist-song-container"
    ).style.display = "none";


    // Show playlist cards
    document.getElementById(
        "playlist-container"
    ).style.display = "flex";


    // Clear current playlist
    currentPlaylist = null;

}

function togglePlaylistSongMenu(event, index) {

    event.stopPropagation();

    const menu =
        document.getElementById(
            `playlist-song-menu-${index}`
        );


    // Close other playlist song menus
    document.querySelectorAll(
        "#playlist-song-container .song-menu"
    ).forEach(otherMenu => {

        if (otherMenu !== menu) {
            otherMenu.style.display = "none";
        }

    });


    // Toggle current menu
    if (menu.style.display === "block") {

        menu.style.display = "none";

        return;
    }


    // Position menu near the three dots
    const button = event.currentTarget;

    const rect =
        button.getBoundingClientRect();


    menu.style.left =
        `${rect.left - 160 + rect.width}px`;

    menu.style.top =
        `${rect.bottom + 5}px`;


    menu.style.display = "block";
}

async function removeSongFromPlaylist(event, index) {

    event.stopPropagation();

    console.log("Remove clicked");


    // Make sure a playlist is open
    if (!currentPlaylist) {

        console.log("No playlist selected");

        return;
    }


    // Get selected song
    const song = currentPlaylist.songs[index];


    if (!song) {

        console.log("Song not found");

        return;
    }


    console.log(
        "Removing:",
        song.title,
        "from:",
        currentPlaylist.name
    );


    try {

        const response = await fetch(

            `http://localhost:5000/api/userplaylist/${currentPlaylist._id}/songs/${song._id}`,

            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }

        );


        const data =
            await response.json();


        console.log(
            "Server response:",
            data
        );


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to remove song"
            );

            return;
        }


        // --------------------------------
        // Remove from the local playlist
        // --------------------------------

        currentPlaylist.songs.splice(index, 1);


        // --------------------------------
        // Refresh the playlist UI
        // --------------------------------

        openPlaylistSongs(currentPlaylist);


        console.log(
            "Song removed successfully"
        );


    } catch (error) {

        console.error(
            "Error removing song:",
            error
        );

        alert(
            "Could not connect to server"
        );

    }

}

// to add song to playlist

let selectedSongForPlaylist = null;
let selectedPlaylistForSong = null;
let isAddingSongToPlaylist = false;

function addSongToPlaylist(event, index) {

    event.stopPropagation();

    // Close the three-dot menu immediately
    document.querySelectorAll(".song-menu").forEach(menu => {
        menu.style.display = "none";
    });


    isAddingSongToPlaylist = true;

    selectedSongForPlaylist = songs[index];

    console.log(
        "Selected song:",
        selectedSongForPlaylist
    );

    // IMPORTANT: hide old Add Song popup
    const addSongPopup =
        document.getElementById("add-song-popup");

    if (addSongPopup) {
        addSongPopup.style.display = "none";
    }

    showHome();

    openPlaylistSelection();
}

function toggleSongMenu(event, index) {

    event.stopPropagation();

    const menu = document.getElementById(`song-menu-${index}`);

    // Close all other menus
    document.querySelectorAll(".song-menu").forEach(otherMenu => {
        if (otherMenu !== menu) {
            otherMenu.style.display = "none";
        }
    });

    // If already open, close it
    if (menu.style.display === "block") {
        menu.style.display = "none";
        return;
    }

    // Get position of the three-dot button
    const button = event.currentTarget;

    const rect = button.getBoundingClientRect();

    // Position popup near the three dots
    menu.style.left = `${rect.left - 160 + rect.width}px`;
    menu.style.top = `${rect.bottom + 5}px`;

    menu.style.display = "block";
}

// playlist popup

function openPlaylistSelection() {

    const overlay =
        document.getElementById("playlist-selection-overlay");

    const playlistSection =
        document.getElementById("playlistSection");

    const popup =
        document.getElementById("select-playlist-popup");

    const addSongPopup =
        document.getElementById("add-song-popup");

    // Hide Add Song popup whenever a new
    // Add to Playlist process starts
    if (addSongPopup) {
        addSongPopup.style.display = "none";
    }

    // Get playlist section position
    const rect =
        playlistSection.getBoundingClientRect();


    // Show overlay
    overlay.style.display = "block";


    // -----------------------------------------
    // Create blurred areas
    // -----------------------------------------

    // Remove old areas if any
    overlay
        .querySelectorAll(".blur-area")
        .forEach(area => area.remove());


    // TOP
    const top = document.createElement("div");

    top.className = "blur-area";

    top.style.left = "0";
    top.style.top = "0";
    top.style.width = "100%";
    top.style.height = rect.top + "px";


    // LEFT
    const left = document.createElement("div");

    left.className = "blur-area";

    left.style.left = "0";
    left.style.top = rect.top + "px";
    left.style.width = rect.left + "px";
    left.style.height = rect.height + "px";


    // RIGHT
    const right = document.createElement("div");

    right.className = "blur-area";

    right.style.left =
        rect.right + "px";

    right.style.top =
        rect.top + "px";

    right.style.width =
        (window.innerWidth - rect.right) + "px";

    right.style.height =
        rect.height + "px";


    // BOTTOM
    const bottom = document.createElement("div");

    bottom.className = "blur-area";

    bottom.style.left = "0";

    bottom.style.top =
        rect.bottom + "px";

    bottom.style.width = "100%";

    bottom.style.height =
        (window.innerHeight - rect.bottom) + "px";


    // Add areas
    overlay.appendChild(top);
    overlay.appendChild(left);
    overlay.appendChild(right);
    overlay.appendChild(bottom);


    // -----------------------------------------
    // Position popup near playlist section
    // -----------------------------------------

    popup.style.left =
        (rect.left + rect.width / 2 - 120) + "px";

    popup.style.top =
        (rect.top + 20) + "px";

    popup.style.display = "block";
}

document.addEventListener("click", function (event) {

    const overlay =
        document.getElementById("playlist-selection-overlay");

    if (overlay.style.display !== "block") {
        return;
    }


    const selectPopup =
        document.getElementById(
            "select-playlist-popup"
        );

    const addSongPopup =
        document.getElementById(
            "add-song-popup"
        );

    const playlistSection =
        document.getElementById(
            "playlistSection"
        );


    // Click inside Select Playlist popup
    if (
        selectPopup &&
        selectPopup.contains(event.target)
    ) {
        return;
    }


    // Click inside Add Song popup
    if (
        addSongPopup &&
        addSongPopup.contains(event.target)
    ) {
        return;
    }


    // Click inside playlist section
    if (
        playlistSection &&
        playlistSection.contains(event.target)
    ) {
        return;
    }


    // Clicked blurred area
    closePlaylistSelection();

});


function closePlaylistSelection() {

    const overlay =
        document.getElementById(
            "playlist-selection-overlay"
        );

    overlay.style.display = "none";

    selectedSongForPlaylist = null;
    selectedPlaylistForSong = null;

    isAddingSongToPlaylist = false;

    console.log("Add to playlist cancelled");
}

function showAddSongPopup() {

    const popup =
        document.getElementById("add-song-popup");

    const playlistName =
        document.getElementById(
            "selected-playlist-name"
        );


    // Show selected playlist name
    playlistName.innerText =
        selectedPlaylistForSong.name;


    // Get playlist section position
    const playlistSection =
        document.getElementById(
            "playlistSection"
        );

    const rect =
        playlistSection.getBoundingClientRect();


    // Position popup near playlist section
    popup.style.left =
        (rect.left + rect.width / 2 - 120) + "px";

    popup.style.top =
        (rect.top + 20) + "px";


    // Hide Select Playlist popup
    document.getElementById(
        "select-playlist-popup"
    ).style.display = "none";


    // Show Add Song popup
    popup.style.display = "block";
}

async function addSelectedSongToPlaylist(event) {

    event.stopPropagation();

    console.log("Add Song clicked");

    if (!selectedSongForPlaylist) {
        console.log("No song selected");
        return;
    }

    if (!selectedPlaylistForSong) {
        console.log("No playlist selected");
        return;
    }

    console.log("Selected song:", selectedSongForPlaylist);
    console.log("Selected playlist:", selectedPlaylistForSong);

    try {

        const response = await fetch(
            `http://localhost:5000/api/userplaylist/${selectedPlaylistForSong._id}/songs`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        "Bearer " +
                        localStorage.getItem("token")
                },

                body: JSON.stringify({
                    songId: selectedSongForPlaylist._id
                })
            }
        );

        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {

            if (response.status === 400) {

                alert("Song already exists in this playlist");

                // Cancel Add-to-Playlist mode
                isAddingSongToPlaylist = false;

                // Clear selected items
                selectedSongForPlaylist = null;
                selectedPlaylistForSong = null;

                // Close Add Song popup
                const addSongPopup =
                    document.getElementById("add-song-popup");

                if (addSongPopup) {
                    addSongPopup.style.display = "none";
                }

                // Close overlay
                const overlay =
                    document.getElementById(
                        "playlist-selection-overlay"
                    );

                if (overlay) {
                    overlay.style.display = "none";
                }

                return;
            }


            alert(
                data.message ||
                "Failed to add song"
            );

            return;
        }

        alert("Song added to playlist");

        isAddingSongToPlaylist = false;

        selectedSongForPlaylist = null;
        selectedPlaylistForSong = null;

        closePlaylistSelection();

        loadPlaylists();

    } catch (error) {

        console.error("Error adding song:", error);

        alert("Could not connect to server");
    }
}

function togglePlaylistMenu(event, playlistId) {

    event.stopPropagation();

    const menu =
        document.getElementById(
            `playlist-menu-${playlistId}`
        );


    // Close every other playlist menu

    document.querySelectorAll(".playlist-menu").forEach(otherMenu => {

        if (otherMenu !== menu) {
            otherMenu.style.display = "none";
        }

    });


    // Toggle current menu

    if (menu.style.display === "block") {

        menu.style.display = "none";

        return;
    }


    // Get three-dot button position

    const button = event.currentTarget;

    const rect =
        button.getBoundingClientRect();


    // Same positioning as your song menu

    menu.style.left = `${rect.left - 160 + rect.width}px`;

    // First make menu visible so we can calculate its height
    menu.style.display = "block";

    // Get menu height
    const menuHeight = menu.offsetHeight;

    // Space available below the button
    const spaceBelow = window.innerHeight - rect.bottom;

    // If there is not enough space below,
    // open the menu above the button
    if (spaceBelow < menuHeight + 5) {

        menu.style.top =
            `${rect.top - menuHeight - 5}px`;

    } else {

        menu.style.top =
            `${rect.bottom + 5}px`;
    }
}

function renamePlaylist(event, playlistId) {

    event.stopPropagation();


    // Close three-dot menu

    const menu =
        document.getElementById(
            `playlist-menu-${playlistId}`
        );

    if (menu) {
        menu.style.display = "none";
    }


    // Find playlist card

    const card =
        menu?.closest(".playlist-user-card");

    if (!card) {

        console.log(
            "Playlist card not found"
        );

        return;
    }


    // Get current playlist name

    const currentName =
        card.querySelector("h3").innerText;


    // =====================================
    // Set modal to RENAME mode
    // =====================================

    playlistModalMode = "rename";

    renamePlaylistId = playlistId;


    // Change title

    document.getElementById(
        "playlist-modal-title"
    ).innerText = "Rename Playlist";


    // Put current name inside input

    const input =
        document.getElementById("playlist-name");

    input.value = currentName;


    // Change button

    const actionButton =
        document.getElementById(
            "playlist-modal-action"
        );

    actionButton.innerText = "Rename";

    actionButton.onclick = renamePlaylistFromModal;


    // Open modal

    const modal =
        document.getElementById("playlist-modal");

    modal.style.display = "flex";

    input.focus();

    input.select();
}

async function renamePlaylistFromModal() {

    const input =
        document.getElementById("playlist-name");

    const newName =
        input.value.trim();


    if (newName === "") {

        alert(
            "Playlist name cannot be empty"
        );

        return;
    }


    if (!renamePlaylistId) {

        console.log(
            "No playlist selected for rename"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/userplaylist/${renamePlaylistId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Authorization":
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            )
                    },

                    body: JSON.stringify({
                        name: newName
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to rename playlist"
            );

            return;
        }


        // =====================================
        // Update playlist card
        // =====================================

        const menu =
            document.getElementById(
                `playlist-menu-${renamePlaylistId}`
            );


        const card =
            menu?.closest(
                ".playlist-user-card"
            );


        if (card) {

            const nameElement =
                card.querySelector("h3");

            if (nameElement) {

                nameElement.innerText =
                    data.playlist.name;

            }

        }


        // =====================================
        // Close modal
        // =====================================

        document
            .getElementById("playlist-modal")
            .style.display = "none";


        // =====================================
        // Reset modal
        // =====================================

        resetPlaylistModal();


        console.log(
            "Playlist renamed successfully"
        );


    } catch (error) {

        console.error(
            "Error renaming playlist:",
            error
        );

        alert(
            "Could not connect to server"
        );

    }
}

function resetPlaylistModal() {

    playlistModalMode = "create";

    renamePlaylistId = null;


    document.getElementById(
        "playlist-modal-title"
    ).innerText = "Create Playlist";


    const input =
        document.getElementById("playlist-name");

    input.value = "";

    input.placeholder =
        "Enter playlist name";


    const actionButton =
        document.getElementById(
            "playlist-modal-action"
        );

    actionButton.innerText = "Create";

    actionButton.onclick = createPlaylist;
}

async function deletePlaylist(event, playlistId) {

    event.stopPropagation();

    // Close menu immediately
    const menu =
        document.getElementById(
            `playlist-menu-${playlistId}`
        );

    if (menu) {
        menu.style.display = "none";
    }


    // Confirm deletion

    const confirmDelete =
        confirm("Are you sure you want to delete this playlist?");

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:5000/api/userplaylist/${playlistId}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        "Bearer " +
                        localStorage.getItem("token")
                }
            }
        );


        const data =
            await response.json();


        console.log("Delete response:", data);


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete playlist"
            );

            return;
        }


        // =====================================
        // Remove playlist card from UI
        // =====================================

        const card =
            document
                .getElementById(`playlist-menu-${playlistId}`)
                ?.closest(".playlist-user-card");


        if (card) {
            card.remove();
        }


        // =====================================
        // Check if playlists are now empty
        // =====================================

        const playlistContainer =
            document.getElementById(
                "playlist-container"
            );


        const remainingCards =
            playlistContainer.querySelectorAll(
                ".playlist-user-card"
            );


        if (remainingCards.length === 0) {

            playlistContainer.style.display = "none";

            document.getElementById(
                "empty-playlist"
            ).style.display = "block";

            document.getElementById(
                "add-playlist-btn"
            ).style.display = "none";
        }


        console.log(
            "Playlist deleted successfully"
        );


    } catch (error) {

        console.error(
            "Error deleting playlist:",
            error
        );

        alert(
            "Could not connect to server"
        );
    }
}

// =========================================
// CLOSE MENUS
// =========================================

function closeAllMenus() {

    // Playlist card menus
    document.querySelectorAll(".playlist-menu").forEach(menu => {
        menu.style.display = "none";
    });


    // Normal song menus
    document.querySelectorAll(".song-menu").forEach(menu => {
        menu.style.display = "none";
    });

}


// =========================================
// CLICK ELSEWHERE
// =========================================

document.addEventListener("click", function () {

    closeAllMenus();

});


// =========================================
// PLAYLIST CARD SCROLL
// =========================================

const playlistContainer =
    document.getElementById("playlist-container");

playlistContainer.addEventListener("scroll", function () {

    closeAllMenus();

});


// =========================================
// NORMAL SONGS SCROLL
// =========================================

const musicContainer =
    document.getElementById("music-container");

musicContainer.addEventListener("scroll", function () {

    closeAllMenus();

});


// =========================================
// PLAYLIST SONGS SCROLL
// =========================================

const playlistSongList =
    document.getElementById("playlist-song-list");

playlistSongList.addEventListener("scroll", function () {

    closeAllMenus();

});



