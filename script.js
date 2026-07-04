// Falling Flowers Logic
function createFlower() {
    const flowers = ['˙⋆❀⋆˙', 'ꕤ', '✿', '⁺˳✿⏦₊', '❁'];
    const f = document.createElement('div');
    f.classList.add('flower');
    f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.left = Math.random() * 100 + "vw";
    f.style.animationDuration = Math.random() * 3 + 2 + "s";
    f.style.fontSize = Math.random() * 20 + 20 + "px";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 5000);
}
setInterval(createFlower, 300);

// Music Persistence — sessionStorage clears automatically when tab/browser is closed
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        music.play();
        sessionStorage.setItem('musicStatus', 'playing');
    } else {
        music.pause();
        sessionStorage.setItem('musicStatus', 'paused');
    }
}

// Save current playback time before navigating to another page on the site
window.addEventListener('beforeunload', () => {
    const music = document.getElementById('bgMusic');
    if (music) {
        sessionStorage.setItem('musicTime', music.currentTime);
        if (!music.paused) {
            sessionStorage.setItem('musicStatus', 'playing');
        }
    }
});

window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
    const savedStatus = sessionStorage.getItem('musicStatus');

    if (!isNaN(savedTime) && savedTime > 0) {
        music.currentTime = savedTime;
    }

    if (savedStatus === 'playing') {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — music will play after first user interaction
            });
        }
    }
});
