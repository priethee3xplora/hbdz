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

// Music controls
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

// Save playback position before navigating away
window.addEventListener('beforeunload', () => {
    const music = document.getElementById('bgMusic');
    if (music) {
        sessionStorage.setItem('musicTime', music.currentTime);
        sessionStorage.setItem('musicStatus', music.paused ? 'paused' : 'playing');
    }
});

// Resume music from saved position on page load
window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');
    if (!music) return;

    const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
    const savedStatus = sessionStorage.getItem('musicStatus');

    if (savedStatus !== 'playing') return;

    function resume() {
        if (!isNaN(savedTime) && savedTime > 0) {
            music.currentTime = savedTime;
        }
        music.play().catch(() => {});
    }

    // Wait until audio has enough metadata to seek
    if (music.readyState >= 1) {
        resume();
    } else {
        music.addEventListener('loadedmetadata', resume, { once: true });
    }
});
