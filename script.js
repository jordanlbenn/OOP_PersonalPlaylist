let userAnswers = {};

// Handle answer selection and button interaction
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

// generate playlist based on user answers
window.generatePlaylist = function () {
  const userName = document.getElementById("user-name");
  const name = userName.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  // Hide quiz, show playlist
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("playlist-container").style.display = "block";
  document.getElementById("display-name").textContent = name;

  // Use a Set to prevent duplicates
  let selectedSongsSet = new Set();

  // User choices
  const answers = {
    mood: userAnswers[1] || "Upbeat",
    activity: userAnswers[2] || "Working Out",
    decade: userAnswers[3] || "2010s",
    lyric: userAnswers[4] || "Deep & Emotional",
    discover: userAnswers[5] || "Friend Recommendations"
  };

  // Function to add songs to the Set
  function addSongs(category) {
    if (category in playlists) {
      playlists[category].songs.forEach(song => selectedSongsSet.add(JSON.stringify(song)));
    }
  }

  // Add songs based on the user's answers
  addSongs(answers.mood);
  if (answers.activity === "Working Out") addSongs("Energetic");
  if (answers.activity === "Studying/Working") addSongs("Chill");
  if (answers.activity === "Driving") addSongs("Upbeat");
  if (answers.activity === "Relaxing") addSongs("Sad");
  if (answers.lyric === "Deep & Emotional") addSongs("Sad");
  if (answers.lyric === "Fun & Catchy") addSongs("Upbeat");
  if (answers.lyric === "I care more about the beat") addSongs("Energetic");

  // Convert the Set back to an array of song objects
  let selectedSongs = Array.from(selectedSongsSet).map(song => JSON.parse(song));

  // If there are fewer than 10 songs, add random songs to fill the playlist
  let allSongs = Object.values(playlists).flatMap(playlist => playlist.songs);
  while (selectedSongs.length < 10) {
    let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];
    if (!selectedSongs.find(song => song.title === randomSong.title)) {
      selectedSongs.push(randomSong);
    }
  }

  // Limit the total to 10 songs
  selectedSongs = selectedSongs.slice(0, 10);

  // Display the playlist name
  document.getElementById("playlist-name").textContent = "Your Custom Playlist";

  // Render the playlist songs
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = selectedSongs.map(song => `
    <div class="song">
      <img src="${song.cover}" width="50">
      <strong>${song.title}</strong> by ${song.artist}
    </div>
  `).join("");
};