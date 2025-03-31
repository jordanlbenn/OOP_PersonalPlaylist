const userAnswers = {};

// Handles answer selection
window.answer = function (event, questionId, choice) {
  userAnswers[questionId] = choice;

  // Remove 'selected' class from all buttons in this question
  const allButtons = document.querySelectorAll(`button[data-question="${questionId}"]`);
  allButtons.forEach(btn => btn.classList.remove('selected'));

  // Add 'selected' class to clicked button
  event.target.classList.add('selected');
};

// Playlist categories with names and songs
const playlists = {
  Upbeat: {
    name: "Sunshine Grooves ☀️",
    songs: [
      { title: "Blinding Lights", artist: "The Weeknd", cover: "/Albums/blindinglights.jpeg" },
      { title: "Uptown Funk", artist: "Bruno Mars", cover: "/Albums/uptownfunk.jpeg" }
    ]
  },
  Chill: {
    name: "Late Night Vibes 🌙",
    songs: [
      { title: "Sunflower", artist: "Post Malone", cover: "images/chill1.jpg" },
      { title: "Circles", artist: "Post Malone", cover: "images/chill2.jpg" }
    ]
  },
  Sad: {
    name: "Rainy Day Feels ☔",
    songs: [
      { title: "Someone Like You", artist: "Adele", cover: "images/sad1.jpg" },
      { title: "Fix You", artist: "Coldplay", cover: "images/sad2.jpg" }
    ]
  },
  Energetic: {
    name: "Hype Mode 🔥",
    songs: [
      { title: "Can't Hold Us", artist: "Macklemore", cover: "images/energetic1.jpg" },
      { title: "Stronger", artist: "Kanye West", cover: "images/energetic2.jpg" }
    ]
  }
};

// Generate playlist based on user answers
window.generatePlaylist = function () {
  const userName = document.getElementById("user-name");
  if (!userName) {
    console.error("User name input field not found!");
    return;
  }

  const name = userName.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  console.log("User Answers Before Processing:", userAnswers);

  // Hide quiz, show playlist
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("playlist-container").style.display = "block";
  document.getElementById("display-name").textContent = name;

  // Use a Map to store unique songs (keyed by title)
  let selectedSongsMap = new Map();

  // User choices (set defaults if undefined)
  const answers = {
    mood: userAnswers[1] || "Upbeat",
    activity: userAnswers[2] || "Working Out",
    decade: userAnswers[3] || "2010s",
    lyric: userAnswers[4] || "Deep & Emotional",
    discover: userAnswers[5] || "Friend Recommendations"
  };

  console.log("Processed Answers:", answers);

  // Function to add unique songs
  function addSongs(category) {
    if (playlists[category]) {
      playlists[category].songs.forEach(song => {
        if (!selectedSongsMap.has(song.title)) {
          selectedSongsMap.set(song.title, song);
        }
      });
    }
  }

  // Add songs based on user choices
  addSongs(answers.mood);
  if (answers.activity === "Working Out") addSongs("Energetic");
  if (answers.activity === "Studying/Working") addSongs("Chill");
  if (answers.activity === "Driving") addSongs("Upbeat");
  if (answers.activity === "Relaxing") addSongs("Sad");
  if (answers.lyric === "Deep & Emotional") addSongs("Sad");
  if (answers.lyric === "Fun & Catchy") addSongs("Upbeat");
  if (answers.lyric === "I care more about the beat") addSongs("Energetic");

  // Convert Map to an array
  let selectedSongs = Array.from(selectedSongsMap.values());

  console.log("Selected Songs Before Randomization:", selectedSongs);

  // Fill up to 10 songs if necessary
  let allSongs = Object.values(playlists).flatMap(playlist => playlist.songs);
  while (selectedSongs.length < 10) {
    let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
    if (!selectedSongsMap.has(randomSong.title)) {
      selectedSongsMap.set(randomSong.title, randomSong);
      selectedSongs.push(randomSong);
    }
  }

  // Limit to exactly 10 songs
  selectedSongs = selectedSongs.slice(0, 10);

  console.log("Final Selected Songs:", selectedSongs);

  // Display playlist name
  document.getElementById("playlist-name").textContent = "Your Custom Playlist";

  // Render the playlist songs
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = selectedSongs.map(song => `
    <div class="song">
      <img src="${song.cover}" width="50" alt="${song.title} cover">
      <strong>${song.title}</strong> by ${song.artist}
    </div>
  `).join("");
};

// Ensure event listener is attached after DOM loads
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", generatePlaylist);
  } else {
    console.error("Submit button not found!");
  }
});