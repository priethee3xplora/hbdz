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

// Music Persistence with time tracking
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    if (music.paused) {
        music.play();
        localStorage.setItem('musicStatus', 'playing');
    } else {
        music.pause();
        localStorage.setItem('musicStatus', 'paused');
    }
}

// Save current playback time before leaving the page
window.addEventListener('beforeunload', () => {
    const music = document.getElementById('bgMusic');
    if (music) {
        localStorage.setItem('musicTime', music.currentTime);
        if (!music.paused) {
            localStorage.setItem('musicStatus', 'playing');
        }
    }
});

window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    const savedStatus = localStorage.getItem('musicStatus');

    if (!isNaN(savedTime) && savedTime > 0) {
        music.currentTime = savedTime;
    }

    if (savedStatus === 'playing') {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — user needs to interact first
            });
        }
    }
});
