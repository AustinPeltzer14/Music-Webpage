// information used for the project
const information = [
    {
      projectName: 'Pearl & Duke',
      company: 'Supermarché',
      audioPlayer: 'https://cldup.com/qR72ozoaiQ.mp3',
      video: '<a href="https://example.com/vid1">Video 1</a>',
      credit: 'Composer'
    },
    {
      projectName: 'The Adam Project',
      company: 'Netflix',
      audioPlayer: 'https://cldup.com/qR72ozoaiQ.mp3',
      video: '<a href="https://example.com/vid2">Video 2</a>',
      credit: 'Additional Music'
    },
    {
      projectName: 'The Independent',
      company: 'Relativity Media',
      audioPlayer: 'https://cldup.com/qR72ozoaiQ.mp3',
      video: '<a href="https://example.com/vid3">Video 3</a>',
      credit: 'Additional Music'
    }
  ];
  
  // declaring variables from HTML
  const mainContainer = document.querySelector('.main-container');
  const listContainer = document.querySelector('.list-container');
  
  // function to get the information from the JSON to appear on the page
  function populate() {
    // looping through all the information stored in the JSON
    for (let i = 0; i < information.length; i++) {
      // creating an <li> to append everything into
      let listItem = document.createElement('li');
  
      // creating a <div> to hold the project and company names
      let headerDiv = document.createElement('div');
  
      // creating an <h2> for the project name
      let projectName = document.createElement('h2');
      projectName.classList.add('project-name');
      projectName.textContent = information[i].projectName;
  
      // creating an <h3> for the company name
      let company = document.createElement('h3');
      company.classList.add('company');
      company.textContent = information[i].company;
  
      // creating a <div> to hold the audio elements
      let audioDiv = document.createElement('div');
  
      // creating <audio> for the music
      let audioPlayer = document.createElement('audio');
      audioPlayer.classList.add('audio-player');
      audioPlayer.setAttribute('src', information[i].audioPlayer);
      audioPlayer.setAttribute('type', 'audio/mpeg');
  
      // creating play/pause button container
      let audioContainer = document.createElement('div');
      audioContainer.classList.add('player-container');
  
      // creating play/pause button
      let audioButton = document.createElement('div');
      audioButton.onclick = playPause;
      audioButton.classList.add('play-pause', 'play');
  
      // creating video element
      let video = document.createElement('p');
      video.classList.add('video');
      video.innerHTML = information[i].video;
  
      // creating <p> for the credit
      let credit = document.createElement('p');
      credit.classList.add('credit');
      credit.textContent = information[i].credit;
  
      // appending project and company to header div
      headerDiv.appendChild(projectName);
      headerDiv.appendChild(company);
  
      // appending audio to its container
      audioDiv.appendChild(audioPlayer);
      audioDiv.appendChild(audioContainer);
      audioContainer.appendChild(audioButton);
  
      listItem.appendChild(headerDiv);
      listItem.appendChild(audioDiv);
      listItem.appendChild(video);
      listItem.appendChild(credit);
      listContainer.appendChild(listItem);
    }
  }
  
  populate();
  
  function playPause() {
    const audioPlayer = this.parentNode.parentNode.querySelector('.audio-player');
    const playPauseIcon = this;
  
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseIcon.classList.remove('play');
      playPauseIcon.classList.add('pause');
      updateSVGFill(playPauseIcon, 'red'); // Update SVG fill to red
    } else {
      audioPlayer.pause();
      playPauseIcon.classList.remove('pause');
      playPauseIcon.classList.add('play');
      updateSVGFill(playPauseIcon, 'red'); // Update SVG fill to red
    }
  }
  
  function updateSVGFill(icon, color) {
    const svgPath = icon.querySelector('svg path');
    if (svgPath) {
      svgPath.style.fill = color;
    }
  }
  
  
  
  