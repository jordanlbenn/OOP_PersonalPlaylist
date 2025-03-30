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
      { title: "Blinding Lights", artist: "The Weeknd", audio: "/Audios/BlindingLightsClip.mp3", cover: "/Albums/blindinglights.jpeg" },
      { title: "Uptown Funk", artist: "Bruno Mars", audio: "/Audios/Uptownfunk.mp3", cover: "/Albums/uptownfunk.jpeg" }
    ]
  },
  Chill: {
    name: "Late Night Vibes 🌙",
    songs: [
      { title: "Sunflower", artist: "Post Malone", audio: "audio/chill1.mp3", cover: "images/chill1.jpg" },
      { title: "Circles", artist: "Post Malone", audio: "audio/chill2.mp3", cover: "images/chill2.jpg" }
    ]
  },
  Sad: {
    name: "Rainy Day Feels ☔",
    songs: [
      { title: "Someone Like You", artist: "Adele", audio: "audio/sad1.mp3", cover: "images/sad1.jpg" },
      { title: "Fix You", artist: "Coldplay", audio: "audio/sad2.mp3", cover: "images/sad2.jpg" }
    ]
  },
  Energetic: {
    name: "Hype Mode 🔥",
    songs: [
      { title: "Can't Hold Us", artist: "Macklemore", audio: "audio/energetic1.mp3", cover: "images/energetic1.jpg" },
      { title: "Stronger", artist: "Kanye West", audio: "audio/energetic2.mp3", cover: "images/energetic2.jpg" }
    ]
  },
  "70s-80s": {
    name: "Retro Vibes 🎶",
    songs: [
      { title: "Stayin' Alive", artist: "Bee Gees", audio: "audio/retro1.mp3", cover: "images/retro1.jpg" },
      { title: "Billie Jean", artist: "Michael Jackson", audio: "audio/retro2.mp3", cover: "images/retro2.jpg" }
    ]
  },
  "90s-2000s": {
    name: "Throwback Classics 🕺",
    songs: [
      { title: "Smells Like Teen Spirit", artist: "Nirvana", audio: "audio/90s1.mp3", cover: "images/90s1.jpg" },
      { title: "Toxic", artist: "Britney Spears", audio: "audio/90s2.mp3", cover: "images/90s2.jpg" }
    ]
  },
  "2010s": {
    name: "Modern Hits 🎧",
    songs: [
      { title: "Shape of You", artist: "Ed Sheeran", audio: "audio/2010s1.mp3", cover: "images/2010s1.jpg" },
      { title: "Rolling in the Deep", artist: "Adele", audio: "audio/2010s2.mp3", cover: "images/2010s2.jpg" }
    ]
  },
  "Today's Hits": {
    name: "Top Charts 🎤",
    songs: [
      { title: "Levitating", artist: "Dua Lipa", audio: "audio/today1.mp3", cover: "images/today1.jpg" },
      { title: "Blinding Lights", artist: "The Weeknd", audio: "audio/today2.mp3", cover: "images/today2.jpg" }
    ]
  },
  "Deep & Emotional": {
    name: "Heartfelt Melodies 💔",
    songs: [
      { title: "Someone Like You", artist: "Adele", audio: "audio/deep1.mp3", cover: "images/deep1.jpg" },
      { title: "Hurt", artist: "Johnny Cash", audio: "audio/deep2.mp3", cover: "images/deep2.jpg" }
    ]
  },
  "Fun & Catchy": {
    name: "Feel-Good Tunes 🎉",
    songs: [
      { title: "Happy", artist: "Pharrell Williams", audio: "audio/fun1.mp3", cover: "images/fun1.jpg" },
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", audio: "audio/fun2.mp3", cover: "images/fun2.jpg" }
    ]
  },
  "I care more about the beat": {
    name: "Beat Driven 🔥",
    songs: [
      { title: "Sicko Mode", artist: "Travis Scott", audio: "audio/beat1.mp3", cover: "images/beat1.jpg" },
      { title: "God's Plan", artist: "Drake", audio: "audio/beat2.mp3", cover: "images/beat2.jpg" }
    ]
  },
  "Friend Recommendations": {
    name: "Word of Mouth 🎶",
    songs: [
      { title: "Old Town Road", artist: "Lil Nas X", audio: "audio/friend1.mp3", cover: "images/friend1.jpg" },
      { title: "Take Me to Church", artist: "Hozier", audio: "audio/friend2.mp3", cover: "images/friend2.jpg" }
    ]
  },
  "App Curated Playlists": {
    name: "AI Curated Beats 🤖",
    songs: [
      { title: "Blinding Lights", artist: "The Weeknd", audio: "audio/ai1.mp3", cover: "images/ai1.jpg" },
      { title: "Save Your Tears", artist: "The Weeknd", audio: "audio/ai2.mp3", cover: "images/ai2.jpg" }
    ]
  },
  "Random": {
    name: "Shuffle it Up 🎲",
    songs: [
      { title: "On The Floor", artist: "Jennifer Lopez", audio: "audio/random1.mp3", cover: "images/random1.jpg" },
      { title: "Take A Bow", artist: "Rihanna", audio: "audio/random2.mp3", cover: "images/random2.jpg" }
    ]
  }
};

// Function to generate a playlist based on user answers
window.generatePlaylist = function () {
  const userName = document.getElementById("user-name"); // Ensure this is properly defined
  const name = userName.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  // Hide quiz, show playlist
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("playlist-container").style.display = "block";
  document.getElementById("display-name").textContent = name;

  // Initialize an array to hold the selected songs
  let selectedSongs = [];

  // User choices
  const answers = {
    mood: userAnswers[1] || "Upbeat",
    activity: userAnswers[2] || "Working Out",
    decade: userAnswers[3] || "2010s",
    lyric: userAnswers[4] || "Deep & Emotional",
    discover: userAnswers[5] || "Friend Recommendations"
  };

  // Add 2 songs based on the answer choices
  if (answers.mood === "Upbeat") selectedSongs.push(...playlists.Upbeat.songs);
  if (answers.mood === "Chill") selectedSongs.push(...playlists.Chill.songs);
  if (answers.mood === "Sad") selectedSongs.push(...playlists.Sad.songs);
  if (answers.mood === "Energetic") selectedSongs.push(...playlists.Energetic.songs);

  if (answers.activity === "Working Out") selectedSongs.push(...playlists.Energetic.songs);
  if (answers.activity === "Studying/Working") selectedSongs.push(...playlists.Chill.songs);
  if (answers.activity === "Driving") selectedSongs.push(...playlists.Upbeat.songs);
  if (answers.activity === "Relaxing") selectedSongs.push(...playlists.Sad.songs);

  if (answers.lyric === "Deep & Emotional") selectedSongs.push(...playlists.Sad.songs);
  if (answers.lyric === "Fun & Catchy") selectedSongs.push(...playlists.Upbeat.songs);
  if (answers.lyric === "I care more about the beat") selectedSongs.push(...playlists.Energetic.songs);

  if (answers.decade === "90s-2000s") selectedSongs.push(...playlists.Upbeat.songs);
  if (answers.decade === "2010s") selectedSongs.push(...playlists.Chill.songs);
  if (answers.discover === "Shuffle/Random") selectedSongs.push(...playlists.Random.songs);

  // Limit the total to 10 songs if more than 10 are selected
  selectedSongs = selectedSongs.slice(0, 10);

  // Display the playlist name
  document.getElementById("playlist-name").textContent = "Your Custom Playlist";

  // Render the playlist songs
  const playlistEl = document.getElementById("playlist");
  playlistEl.innerHTML = selectedSongs.map(song => `
    <div class="song" onclick="playAudio('${song.audio}')">
      <img src="${song.cover}" width="50">
      <strong>${song.title}</strong> by ${song.artist}
    </div>
  `).join("");
};

// Play audio function
window.playAudio = function (audioPath) {
  const player = document.getElementById("audio-player");
  player.src = audioPath;
  player.play();
};