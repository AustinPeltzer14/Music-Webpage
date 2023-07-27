console.log('hello');

function createAudioControl(url) {
  let button = document.createElement('button');
  button.id = "control";
  button.className = "fas fa-play fa-1x";
  button.onclick = function() { toggleAudio(this); };

  let audio = document.createElement('audio');
  audio.className = "audio-player";
  audio.src = url;
  audio.type = "audio/mpeg";
  audio.ontimeupdate = function() { updateProgressBar(this, this.parentElement); };

  let progressBar = document.createElement('progress');
  progressBar.className = "progress-bar";
  progressBar.max = 100;
  progressBar.value = 0;

  let audioDiv = document.createElement('div');
  audioDiv.appendChild(button);
  audioDiv.appendChild(audio);
  audioDiv.appendChild(progressBar);

  return audioDiv;
}

function playAudio(button) {
  var trackContainer = button.parentElement;
  var audio = trackContainer.querySelector(".audio-player");
  audio.play().catch(function (error) {
    console.log("Autoplay prevented. Please click play again.");
  });
}

function pauseAudio(button) {
  var trackContainer = button.parentElement;
  var audio = trackContainer.querySelector(".audio-player");
  audio.pause();
}

function toggleAudio(button) {
  if (button.className == "fas fa-play fa-1x") {
    button.className = "fas fa-pause fa-1x";
    playAudio(button);
  } else {
    button.className = "fas fa-play fa-1x";
    pauseAudio(button);
  }
}

function updateProgressBar(audio, trackContainer) {
  var progressBar = trackContainer.querySelector(".progress-bar");
  var progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
}

function createProjectList() {
  const listContainer = document.createElement('ul');
  listContainer.classList.add('list-container');
  
  console.log(projects.length);

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    const listItem = document.createElement('li');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.className = 'project-name';
    h2.textContent = project.projectName;
    const h3 = document.createElement('h3');
    h3.className = 'company';
    h3.textContent = project.subTitle;
    div.appendChild(h2);
    div.appendChild(h3);

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    const playVideoButton = document.createElement('button');
    playVideoButton.className = 'video-button play-video';
    playVideoButton.textContent = 'Play Video';
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';
    const closeVideoButton = document.createElement('button');
    closeVideoButton.className = 'close-video';
    closeVideoButton.textContent = 'Close';
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = project.videoURL;
    iframe.title = 'YouTube video player';
    iframe.frameborder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframeContainer.appendChild(closeVideoButton);
    iframeContainer.appendChild(iframe);
    videoContainer.appendChild(playVideoButton);
    videoContainer.appendChild(iframeContainer);

    const creditsDiv = document.createElement('div');
    const creditsP = document.createElement('p');
    creditsP.className = 'credit';
    creditsP.textContent = project.credits;
    creditsDiv.appendChild(creditsP);

    listItem.appendChild(div);

    const audioFiles= project.audioFiles;
    
    for (let j = 0; j < project.audioFiles.length; j++) {
      const audioFile= project.audioFiles[j];
      const audioControl = createAudioControl(audioFile.url);
      div.appendChild(audioControl);
      listItem.appendChild(audioControl);
    }

    listItem.appendChild(videoContainer);
    listItem.appendChild(creditsDiv);

    // Add next and prev divs
    

    let prevDiv = document.createElement('div');
    prevDiv.className = 'prev';
    prevDiv.innerHTML = '<i class="fa fa-backward"></i>';
    listItem.appendChild(prevDiv);

     let nextDiv = document.createElement('div');
    nextDiv.className = 'next';
    nextDiv.innerHTML = '<i class="fa fa-forward"></i>';
    listItem.appendChild(nextDiv);

    listContainer.appendChild(listItem);
  }

  document.getElementById('project-list').appendChild(listContainer);
}
 
createProjectList();