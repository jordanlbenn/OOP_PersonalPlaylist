document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            console.log("Submit button clicked! Calling generatePlaylist()...");
            generatePlaylist();
        });
    } else {
        console.error("Submit button not found!");
    }
});

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
            { title: "Feels Like Summer", artist: "Childish Gambino", cover: "/Albums/uptownfunk.jpeg" },
            { title: "BE YOUR GIRL", artist: "Teedra Moses - KAYTRANADA Remix", cover: "/Albums/uptownfunk.jpeg" },
            { title: "Sunshine", artist: "Steve Lacy feat. Fousheé", cover: "/Albums/uptownfunk.jpeg" }
        ]
    },
    Chill: {
        name: "Late Night Vibes 🌙",
        songs: [
            { title: "Drake", artist: "Cece's Interlude", cover: "images/chill1.jpg" },
            { title: "Awkward", artist: "SZA", cover: "images/chill2.jpg" },
            { title: "All I Want Is You", artist: "Miguel, J.Cole", cover: "/Albums/uptownfunk.jpeg" },
            { title: "The Way", artist: "Jill Scott", cover: "/Albums/uptownfunk.jpeg" }
        ]
    },
    Sad: {
        name: "Rainy Day Feels ☔",
        songs: [
            { title: "Someone Like You", artist: "Adele", cover: "images/sad1.jpg" },
            { title: "Fix You", artist: "Coldplay", cover: "images/sad2.jpg" },
            { title: "Show Me How", artist: "Men I Trust", cover: "/Albums/uptownfunk.jpeg" }
        ]
    },
    Energetic: {
        name: "Hype Mode 🔥",
        songs: [
            { title: "Yeah Glo!", artist: "GloRilla", cover: "images/energetic1.jpg" },
            { title: "Stronger", artist: "Kanye West", cover: "images/energetic2.jpg" },
            { title: "Persuasive", artist: "Doechii, SZA", cover: "/Albums/uptownfunk.jpeg" },
            { title: "Champions", artist: "Kanye West & Others", cover: "/Albums/uptownfunk.jpeg" }
        ]
    }
};

// Generate playlist based on user answers
window.generatePlaylist = function () {
    console.log("generatePlaylist function is running");

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

    const quizContainer = document.getElementById("quiz-container");
    const playlistContainer = document.getElementById("playlist-container");

    if (!quizContainer || !playlistContainer) {
        console.error("Quiz or Playlist container not found!");
        return;
    }

    // Hide quiz, show playlist
    quizContainer.style.display = "none";
    playlistContainer.style.display = "block";
    document.getElementById("display-name").textContent = name;

    console.log("Playlist container should now be visible");

    // Initialize selectedSongsMap here
    const selectedSongsMap = new Map();  // This initializes the map properly

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
        } else {
            console.warn(`Playlist category '${category}' not found.`);
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

    // Get all available songs
    let allSongs = Object.values(playlists).flatMap(playlist => playlist.songs);
    console.log("All available songs:", allSongs);

    if (!Array.isArray(allSongs) || allSongs.length === 0) {
        console.error("No songs available in allSongs!");
        return;
    }

    // Fill up to 10 songs if necessary
    let safetyCounter = 0;
    while (selectedSongs.length < 10) {
        let randomSong = allSongs[Math.floor(Math.random() * allSongs.length)];

        // Only add the song if it's not already in the map
        if (!selectedSongsMap.has(randomSong.title)) {
            selectedSongsMap.set(randomSong.title, randomSong);
            selectedSongs.push(randomSong);
        }

        safetyCounter++;

        // Prevent infinite loop if we can't find enough unique songs
        if (safetyCounter > 50) {  // Increased the limit to handle more attempts
            console.error("Unable to find enough unique songs! Breaking out.");
            break;
        }
    }

    // Limit to exactly 10 songs
    selectedSongs = selectedSongs.slice(0);

    console.log("Final Selected Songs:", selectedSongs);

    // Check if playlist container exists before modifying
    const playlistEl = document.getElementById("playlist");
    if (!playlistEl) {
        console.error("Playlist container element not found!");
        return;
    }

    // Display playlist name
    document.getElementById("playlist-name").textContent = "Your Custom Playlist";

    // Render the playlist songs
    playlistEl.innerHTML = selectedSongs.map(song => `
        <div class="song">
            <img src="${song.cover}" width="50" alt="${song.title} cover">
            <strong>${song.title}</strong> by ${song.artist}
        </div>
    `).join("");
};