let userAnswers = {};
const userName = document.getElementById("user-name");

// Quiz questions handler
function answer(event, questionId, choice) {
  userAnswers[questionId] = choice;

  // Remove 'selected' class from all buttons in this question
  const allButtons = document.querySelectorAll(`button[data-question="${questionId}"]`);
  allButtons.forEach(btn => btn.classList.remove('selected'));

  // Add 'selected' class to clicked button
  event.target.classList.add('selected');
}

// Playlist database
const songsDatabase = {
  Upbeat: [
    { title: "Blinding Lights", artist: "The Weeknd", audio: "", cover: "/Albums/blindinglights.jpeg" },
    { title: "Uptown Funk", artist: "Bruno Mars", audio: "audio/upbeat2.mp3", cover: "images/upbeat2.jpg" }
  ],
  Chill: [
    { title: "Sunflower", artist: "Post Malone", audio: "audio/chill1.mp3", cover: "images/chill1.jpg" },
    { title: "Circles", artist: "Post Malone", audio: "audio/chill2.mp3", cover: "images/chill2.jpg" }
  ],
  Sad: [
    { title: "Someone Like You", artist: "Adele", audio: "audio/sad1.mp3", cover: "images/sad1.jpg" },
    { title: "Fix You", artist: "Coldplay", audio: "audio/sad2.mp3", cover: "images/sad2.jpg" }
  ],
  Energetic: [
    { title: "Can't Hold Us", artist: "Macklemore", audio: "audio/energetic1.mp3", cover: "images/energetic1.jpg" },
    { title: "Stronger", artist: "Kanye West", audio: "audio/energetic2.mp3", cover: "images/energetic2.jpg" }
  ]
};

function generatePlaylist() {
  const name = userName.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  // Hide quiz, show playlist
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("playlist-container").style.display = "block";
  document.getElementById("display-name").textContent = name;

  // Determine playlist type
  const mood = userAnswers[1] || "Upbeat"; 
  const activity = userAnswers[2] || "Working Out"; 
  const decade = userAnswers[3] || "70s-80s"; 
  const lyric = userAnswers[4] || "Deep & Emotional";
  const discover = userAnswers[5] || "Friend Recommendations";
  
  // Logic for playlist selection (You can extend this as per your logic)
  // Here, we're just simplifying to pick based on the 'mood' answer.
  const playlist = songsDatabase[mood] || songsDatabase["Upbeat"];

  // Render playlist
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = playlist.map(song => `
    <div class="song" onclick="playAudio('${song.audio}')">
      <img src="${song.cover}" width="50">
      <strong>${song.title}</strong> by ${song.artist}
    </div>
  `).join("");
}

// Play audio function
function playAudio(audioPath) {
  const player = document.getElementById("audio-player");
  player.src = audioPath;
  player.play();
}