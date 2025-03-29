// Store user answers
let userAnswers = {};
const userName = document.getElementById("user-name");

// Quiz questions handler
function answer(questionId, choice) {
  userAnswers[questionId] = choice;
}

// Mock playlist database (replace with Spotify API later)
const songsDatabase = {
  upbeat: [
    { title: "Blinding Lights", artist: "The Weeknd", audio: "audio/upbeat1.mp3", cover: "images/upbeat1.jpg" },
    { title: "Uptown Funk", artist: "Bruno Mars", audio: "audio/upbeat2.mp3", cover: "images/upbeat2.jpg" }
  ],
  chill: [
    { title: "Sunflower", artist: "Post Malone", audio: "audio/chill1.mp3", cover: "images/chill1.jpg" },
    { title: "Circles", artist: "Post Malone", audio: "audio/chill2.mp3", cover: "images/chill2.jpg" }
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

  // Determine playlist type (simplified logic)
  const mood = userAnswers[1] || "upbeat"; // Default to upbeat
  const playlist = songsDatabase[mood];

  // Render playlist
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = playlist.map(song => `
    <div class="song" onclick="playAudio('${song.audio}')">
      <img src="${song.cover}" width="50">
      <strong>${song.title}</strong> by ${song.artist}
    </div>
  `).join("");
}

function answer(questionId, choice) {
  userAnswers[questionId] = choice;
  
  // Remove 'selected' class from all buttons in this question
  const allButtons = document.querySelectorAll(`button[data-question="${questionId}"]`);
  allButtons.forEach(btn => btn.classList.remove('selected'));
  
  // Add 'selected' class to clicked button
  event.target.classList.add('selected');
}

// Play audio function
function playAudio(audioPath) {
  const player = document.getElementById("audio-player");
  player.src = audioPath;
  player.play();
}