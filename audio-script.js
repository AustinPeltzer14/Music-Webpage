function buildAudioPlayer(audioFiles, audioContainer) {
  let mainDiv = document.createElement("div");
  mainDiv.id = "music";

  let hiddenPlayer = document.createElement("audio");
  hiddenPlayer.id = "hidden-player";
  hiddenPlayer.order=0
  mainDiv.appendChild(hiddenPlayer);

  let img = document.createElement("img");
  mainDiv.appendChild(img);

  let title = document.createElement("div");
  title.className = "title";
  mainDiv.appendChild(title);

  let playerSongDiv = document.createElement("div");
  playerSongDiv.className = "player-song";
  mainDiv.appendChild(playerSongDiv);

  hiddenPlayer.progress = document.createElement("progress");
  let progress = hiddenPlayer.progress
  progress.value = 0;
  progress.max = 1; 
  playerSongDiv.appendChild(progress);
  let actionsDiv = document.createElement("div");
  actionsDiv.className = "actions";
  playerSongDiv.appendChild(actionsDiv);

  let listIcon = document.createElement("i");
  listIcon.className = "fa fa-list-ul";
  // actionsDiv.appendChild(listIcon);

  let prevDiv = document.createElement("div");
  prevDiv.className = "prev";
  actionsDiv.appendChild(prevDiv);

  let prevIcon = document.createElement("i");
  prevIcon.className = "fa fa-backward";
  prevDiv.appendChild(prevIcon);

   let playDiv = document.createElement("div");
  playDiv.className = "play";
  actionsDiv.appendChild(playDiv);







  hiddenPlayer.playIcon = document.createElement("i");
  let playIcon = hiddenPlayer.playIcon
  playIcon.id = "playmusic";
  playIcon.className = "fa fa-play";
  playDiv.appendChild(playIcon);
  console.dir(playIcon);

  hiddenPlayer.pauseIcon = document.createElement("i");
  let pauseIcon =hiddenPlayer.pauseIcon
  pauseIcon.id = "pause";
  pauseIcon.className = "fa fa-pause";
  playDiv.appendChild(pauseIcon);
  console.dir(hiddenPlayer)
  pauseIcon.addEventListener("click", function () {
    hiddenPlayer.pause();
    playIcon.style.display = "block";
    this.style.display = "none";
  });
  playIcon.addEventListener("click", function () {
    hiddenPlayer.play();
    this.style.display = "none";
    pauseIcon.style.display = "block";
  });
  /*$("#playmusic").click(function () {
    hiddenPlayer.play();
    $("#playmusic").hide();
    $("#pause").show().addClass("active");
  });
  $("#pause").click(function () {
    hiddenPlayer.pause();
    $("#playmusic").show();
    $("#pause").hide();
  });*/
  let nextDiv = document.createElement("div");
  nextDiv.className = "next";
  actionsDiv.appendChild(nextDiv);

  let nextIcon = document.createElement("i");
  nextIcon.className = "fa fa-forward";
  nextDiv.appendChild(nextIcon);

  let volumeUpIcon = document.createElement("i");
  volumeUpIcon.id = "sound";
  volumeUpIcon.className = "fa fa-volume-up";
  actionsDiv.appendChild(volumeUpIcon);

  let volumeOffIcon = document.createElement("i");
  volumeOffIcon.id = "mute";
  volumeOffIcon.className = "fa fa-volume-off";
  actionsDiv.appendChild(volumeOffIcon);

  audioContainer.appendChild(mainDiv);

  function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s / 3600);
    s -= h * 3600;
    var m = Math.floor(s / 60);
    s -= m * 60;
    return h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  const songs = audioFiles;
  console.log(songs);
  var initSongSrc = songs[0].url;
  var initSongTitle = songs[0].title;
  var items = songs.length - 1;

  console.dir(initSongSrc);
  hiddenPlayer.setAttribute("src", initSongSrc);
  title.innerHTML = initSongTitle;

  var num = 0; 

  nextDiv.addEventListener("click", function () {
    var songOrder = hiddenPlayer.order;
    if (items == songOrder) {
        songOrder = 0;
        var songSrc = songs[0].url;
        var songTitle = songs[0].title;
        hiddenPlayer.order = 0;
        hiddenPlayer.src = songSrc; 
        hiddenPlayer.play(); 
        title.innerHTML = songTitle; 
    } else {
        console.log(songOrder);
        songOrder += 1;
        var songSrc = songs[songOrder].url; 
        var songTitle = songs[songOrder].title; 
        hiddenPlayer.src = songSrc;
        hiddenPlayer.play(); 
        title.innerHTML = songTitle; 
        hiddenPlayer.order = songOrder; 
    }
});


  prevDiv.addEventListener("click", function () {
    var songOrder = hiddenPlayer.order;
    console.log(songOrder)

    if (songOrder == 0) {
      num = items;
      console.log("if",num)
      var songSrc = songs[items].url;
      var songTitle = songs[items].title;
      hiddenPlayer.order = num;
      hiddenPlayer.src = songSrc; 
      hiddenPlayer.play(); 
      title.innerHTML = songTitle;
      // hiddenPlayer.setAttribute("order", items);
      // hiddenPlayer.setAttribute("src", songSrc).trigger("play");
      // title.innerHTML(songTitle);
    } else {
      num -= 1;
      console.log("else",num)

      var songSrc = songs[num].url;
      var songTitle = songs[num].title;
      

      hiddenPlayer.src = songSrc;
      hiddenPlayer.play(); 
      title.innerHTML = songTitle; 
      hiddenPlayer.order = num; 
      // hiddenPlayer.setAttribute("src", songSrc).trigger("play");
      // title.innerHTML(songTitle);

      // hiddenPlayer.setAttribute("order", num);
    }
  });

  // $("#playmusic").click(function () {
  //   hiddenPlayer.play();
  //   $("#playmusic").hide();
  //   $("#pause").show().addClass("active");
  // });
  // $("#pause").click(function () {
  //   hiddenPlayer.pause();
  //   $("#playmusic").show();
  //   $("#pause").hide();
  // });

  hiddenPlayer.addEventListener("timeupdate", function () {
    console.dir(this)
    var songLength = secondsTimeSpanToHMS(this.duration);
    var songLengthParse = songLength.split(".")[0];

    var songCurrent = secondsTimeSpanToHMS(this.currentTime);
    var songCurrentParse = songCurrent.split(".")[0];
    this.progress.setAttribute("value", this.currentTime / this.duration);

    if (!hiddenPlayer.paused) {
      this.playIcon.style.display="none";
      this.pauseIcon.style.display="block"
      
      this.progress.style.cursor="pointer";
      this.progress.addEventListener("click", function (e) {
        var parentOffset = $(this).parent().offset();
        var relX = e.pageX - parentOffset.left;
        var percPos = (relX * 100) / 355;
        var second = (hiddenPlayer.duration * parseInt(percPos)) / 100;
        console.log(second);
        hiddenPlayer.currentTime = second;
      });
    }

    if (this.currentTime == this.duration) {
      $(".next").trigger("click");
    }
  });

  $("#mute").click(function () {
    hiddenPlayer.volume = 1;
    $("#mute").hide();
    $("#sound").show();
  });
  $("#sound").click(function () {
    hiddenPlayer.volume = 0;
    $("#mute").show();
    $("#sound").hide();
  });
}

/*const listContainer = document.createElement("ul");
listContainer.classList.add("list-container");*/

const listContainer = document.getElementById("project-list");

console.log(projects.length);

for (let i = 0; i < projects.length; i++) {
  const project = projects[i];

  const listItem = document.createElement("li");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.className = "project-name";
  h2.textContent = project.projectName;
  const h3 = document.createElement("h3");
  h3.className = "company";
  h3.textContent = project.subTitle;
  div.appendChild(h2);
  div.appendChild(h3);

  const audioContainer = document.createElement("div");
  const videoContainer = document.createElement("div");
  videoContainer.className = "video-container";

  const playVideoButton = document.createElement("i");
  playVideoButton.className = "video-button play-video fa fa-youtube-play";
  // playVideoButton.src = '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#000000;}  </style> <g> <path class="st0" d="M484.516,19.531l-48.297,69.797l47.984,69.344h-54.266l-47.969-69.344l49.813-72h-68.625l-49.813,72 l47.969,69.344h-54.25l-47.969-69.344l49.797-72H240.25l-49.813,72l47.984,69.344h-54.266l-47.969-69.344l49.813-72h-68.625 l-49.813,72l47.969,69.344h-54.25L13.313,89.328l49.813-72H40c-22.094,0-40,17.906-40,40v397.344c0,22.094,17.906,40,40,40h432 c22.094,0,40-17.906,40-40V57.328C512,39.625,500.438,24.797,484.516,19.531z M480,454.672c0,4.422-3.594,8-8,8H40 c-4.406,0-8-3.578-8-8v-264h448V454.672z"/> <path class="st0" d="M215.688,393.156c0.75,0.438,1.672,0.406,2.406-0.031l101.75-60.719c0.719-0.438,1.156-1.219,1.156-2.063 c0-0.813-0.438-1.609-1.156-2.031l-101.75-60.734c-0.734-0.422-1.656-0.453-2.406-0.031c-0.719,0.422-1.188,1.234-1.188,2.078 v60.719v60.734C214.5,391.953,214.969,392.75,215.688,393.156z"/> </g> </g></svg>'
  
  // const playVideoButton = document.createElement("img");
  // playVideoButton.className = "video-button play-video";
  // playVideoButton.src = '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#000000;}  </style> <g> <path class="st0" d="M484.516,19.531l-48.297,69.797l47.984,69.344h-54.266l-47.969-69.344l49.813-72h-68.625l-49.813,72 l47.969,69.344h-54.25l-47.969-69.344l49.797-72H240.25l-49.813,72l47.984,69.344h-54.266l-47.969-69.344l49.813-72h-68.625 l-49.813,72l47.969,69.344h-54.25L13.313,89.328l49.813-72H40c-22.094,0-40,17.906-40,40v397.344c0,22.094,17.906,40,40,40h432 c22.094,0,40-17.906,40-40V57.328C512,39.625,500.438,24.797,484.516,19.531z M480,454.672c0,4.422-3.594,8-8,8H40 c-4.406,0-8-3.578-8-8v-264h448V454.672z"/> <path class="st0" d="M215.688,393.156c0.75,0.438,1.672,0.406,2.406-0.031l101.75-60.719c0.719-0.438,1.156-1.219,1.156-2.063 c0-0.813-0.438-1.609-1.156-2.031l-101.75-60.734c-0.734-0.422-1.656-0.453-2.406-0.031c-0.719,0.422-1.188,1.234-1.188,2.078 v60.719v60.734C214.5,391.953,214.969,392.75,215.688,393.156z"/> </g> </g></svg>'
  
  const iframeContainer = document.createElement("div");
  iframeContainer.className = "iframe-container";
  const closeVideoButton = document.createElement("button");
  closeVideoButton.className = "close-video";
  closeVideoButton.textContent = "Close";
  const iframe = document.createElement("iframe");
  iframe.width = "560";
  iframe.height = "315";
  iframe.src = project.videoURL;
  iframe.title = "YouTube video player";
  iframe.frameborder = "0";
  iframe.allow = 
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframeContainer.appendChild(closeVideoButton);
  iframeContainer.appendChild(iframe);
  videoContainer.appendChild(playVideoButton);
  videoContainer.appendChild(iframeContainer);

  const creditsDiv = document.createElement("div");
  const creditsP = document.createElement("p");
  creditsP.className = "credit";
  creditsP.textContent = project.credits;
  creditsDiv.appendChild(creditsP);

  listItem.appendChild(div);
  const overlayContainer = document.createElement("div");        
  overlayContainer.appendChild(audioContainer);                   
  overlayContainer.appendChild(videoContainer);           
  const overlay = document.createElement("div");   
  overlayContainer.appendChild(overlay); 
  overlayContainer.className = "overlay-container";
  overlay.className = "overlay";

  listItem.appendChild(overlayContainer);                  


  
  
  


  /*for (let j = 0; j < project.audioFiles.length; j++) {
      const audioFile= project.audioFiles[j];
      const audioControl = createAudioControl(audioFile.url);
      div.appendChild(audioControl);
      listItem.appendChild(audioControl);
    } */

  // listItem.appendChild(videoContainer);
  listItem.appendChild(creditsDiv);

  // Add next and prev divs

  listContainer.appendChild(listItem);
  const audioFiles = project.audioFiles;

  buildAudioPlayer(audioFiles, audioContainer);
}

//document.getElementById("project-list").appendChild(listContainer);
