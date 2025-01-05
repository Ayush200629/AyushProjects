// Select elements
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const songImgEl = document.getElementById('song-img');
const playlist = document.getElementById('playlist');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Playlist data
let currentSongIndex = 0;
const songs = Array.from(playlist.querySelectorAll('li'));

// Load song
function loadSong(song) {
    const src = song.getAttribute('data-src');
    const title = song.getAttribute('data-title');
    const artist = song.getAttribute('data-artist');
    const img = song.getAttribute('data-img');

    audio.src = src;
    songTitleEl.textContent = title;
    songArtistEl.textContent = artist;
    songImgEl.src = img;
}

// Play/pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    } else {
        audio.pause();
        playPauseBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
});

// Set audio position on progress bar change
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Display duration
audio.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

// Change song on playlist click
playlist.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentSongIndex = songs.indexOf(e.target);
        loadSong(e.target);
        audio.play();
        playPauseBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playPauseBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playPauseBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
});

// Load initial song
loadSong(songs[currentSongIndex]);







