
let currentaudio = null;

function changeImage(img) {
    let music = document.querySelector(".music");
    music.style.display = "grid";
    let rightgrid = document.querySelector(".rightgrid");
    rightgrid.style.gridtemplaterows = "70px minmax(0,1fr) 100px";
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
    let rightgrid = document.querySelector(".rightgrid");
    rightgrid.style.gridtemplaterows = "70px minmax(0,1fr) 100px";

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

showTrendingSkeletons();

fetch("https://swar-hbde.onrender.com/api/Trendsongs")
    .then(res => res.json())
    .then(Trendsongss => {
        Trendsongs = Trendsongss;

        // Remove skeletons
        TrendContainer.innerHTML = "";

        Trendsongss.forEach((song, index) => {
            const card = document.createElement("div");
            card.className = "card border";

            card.innerHTML = `
    <audio  data-index="${index}" data-type="trend" class="music1" src="${song.audio}"></audio>
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

showMusicSkeletons();

fetch("https://swar-hbde.onrender.com/api/songs")
    .then(res => res.json())
    .then(songss => {
        songs = songss;

        // Remove skeletons
        container.innerHTML = "";

        songss.forEach((song, index) => {
            const card = document.createElement("div");
            card.className = "music-card ";
            card.innerHTML = ` 


    <img style="width:50px;height:50px;border-radius: 10px;"
        src="${song.image}">
        <audio  data-index="${index}" data-type="simple" class="music1" src="${song.audio}"></audio>
        <div style="font-size:12px;">
            <div style="font-weight:600;white-space: nowrap;text-overflow: ellipsis;
            overflow: hidden;">${song.title}</div>
            <div style="color:rgb(180,180,180);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
               ${song.artist}
            </div>
        </div>
        <img data-index="${index}" data-type="simple" onclick="changeImage(this)" class="music-icon invert play cursor" style="width:20px;height:20px;"
            src="https://www.svgrepo.com/show/522226/play.svg" alt="">

                            
    
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

    const list = type === "trend" ? Trendsongs : songs;
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

    const list = type === "trend" ? Trendsongs : songs;
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
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
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

function gosignup() {
    window.location.href = "signup.html";
}

function gologin() {
    window.location.href = "login.html";
}


// =========================
// SKELETON LOADING
// =========================

function showTrendingSkeletons() {

    TrendContainer.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        const skeleton = document.createElement("div");

        skeleton.className = "card border skeleton-card";

        skeleton.innerHTML = `
            <div style="width:100%;height:70%;position:relative;">
                <div class="skeleton-box skeleton-trend-image"></div>
            </div>

            <div>
                <div class="skeleton-box skeleton-title"></div>
                <div class="skeleton-box skeleton-artist"></div>
            </div>
        `;

        TrendContainer.appendChild(skeleton);
    }
}


function showMusicSkeletons() {

    container.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const skeleton = document.createElement("div");

        skeleton.className = "music-card skeleton-card";

        skeleton.innerHTML = `
            <div class="skeleton-box skeleton-music-image"></div>

            <div>
                <div class="skeleton-box skeleton-music-title"></div>
                <div class="skeleton-box skeleton-music-artist"></div>
            </div>

            <div class="skeleton-box"
                 style="width:20px;height:20px;border-radius:50%;">
            </div>
        `;

        container.appendChild(skeleton);
    }
}
