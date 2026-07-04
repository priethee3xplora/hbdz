// Falling Flowers Logic
function createFlower() {
    const flowers = ['˙⋆❀⋆˙', 'ꕤ', '✿', '⁺˳✿⏦₊', '❁ ྀིྀི'];
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

// Music Persistence
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

window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');
    if (localStorage.getItem('musicStatus') === 'playing') {
        music.play();
    }
});Interval(createFlower, 300);

localStorage.setItem("musicTime", audio.currentTime);
audio.currentTime=localStorage.getItem("musicTime") || 0;
audio.play();