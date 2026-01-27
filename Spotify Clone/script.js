console.log("let's start javascript")

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mpeg")) {
            songs.push(element.href)
        }

    }
    return songs

}

async function main() {
    //get the list of all songs
    let songs= await getsongs()
    console.log(songs)

    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML=songUL.innerHTML + `<li>${song}</li>`
        
    }
    
    //play the first song
    var audio=new Audio(songs[0]);
    // audio.play();

    audio.addEventListener("loadeddata",()=>{
             let duration=audio.duration;
             console.log(duration);
             
    })
}
 
main();