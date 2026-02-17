console.log("let's start javascript")
let currentSong=new Audio();
let percent

function secondsToTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    if (minutes < 10) minutes = "0" + minutes;
    if (remainingSeconds < 10) remainingSeconds = "0" + remainingSeconds;

    return `${minutes}:${remainingSeconds}`;
}


async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mpeg") || element.href.endsWith(".mp3")) {
    songs.push(element.href.split("/songs/")[1]);
}


    }
    return songs

}


const playMusic=(track,pause=false)=>{
    // let audio=new Audio("/songs/"+track)
    currentSong.src="/songs/"+track
    if(!pause){
        currentSong.play()
        play.src="img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}

async function main() {
    //get the list of all songs
    let songs= await getsongs()
    playMusic(songs[0],true)


    //Show all the songs in the playlist
    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML + `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Rohan</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                            <img style="width: 30px;
    height: 30px;" class="invert" src="img/play.png" alt="">
                            </div>        
        </li>`
    }


//Attach an event listener to each song
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
})

//Attach an event listener to play next and previous

play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "img/pause.svg";
    } else {
        currentSong.pause();
        play.src = "img/play.svg";
    }
});



//listen for time update event
currentSong.addEventListener("loadedmetadata", () => {
    document.querySelector(".songtime").innerText =
        `00:00 / ${secondsToTime(currentSong.duration)}`;
});

currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerText =
        `${secondsToTime(currentSong.currentTime)} / ${secondsToTime(currentSong.duration)}`;
});

// seek bar moving
currentSong.addEventListener("timeupdate", () => {
    let percent = (currentSong.currentTime / currentSong.duration) * 100;
    document.querySelector(".circle").style.left = percent + "%";
});


// Add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click", e => { let percent =
        (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime =
        (currentSong.duration * percent) / 100;
});


//Add an event listener for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0"
})

//Add an event listener for close button
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-110%"
})

//Add an event listener for previous
previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if (index - 1 >= 0) {
        playMusic(songs[index - 1])
    }
})

//Add an event listener for next
next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if (index + 1 < songs.length) {
        playMusic(songs[index + 1])
    }
})


//Add an event to volume
document.querySelector(".range input")
    .addEventListener("input", (e) => {
        currentSong.volume = e.target.value / 100;
    });


}
 
main();