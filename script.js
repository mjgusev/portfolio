particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#667eea" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#667eea", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

document.addEventListener('DOMContentLoaded', (event) => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    function updateDarkMode(isDarkMode) {
        body.classList.toggle('dark-mode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        navToggle.style.color = isDarkMode ? '#f0f0f0' : '#333';
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = !body.classList.contains('dark-mode');
        updateDarkMode(isDarkMode);
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        updateDarkMode(true);
    }
});

function playOhioStateAnthem() {
    const audio = new Audio('https://www.osu.edu/assets/downloads/audio/ringtones/BuckeyeBattleCry-Music.mp3');
    audio.play();
    const favicon = document.querySelector('link[rel="icon"]');
    const originalFavicon = favicon.href;
    favicon.href = 'https://www.osu.edu/assets/files/favicon.ico';
    setTimeout(() => {
        favicon.href = originalFavicon;
    }, 30000); // Change back after 30 seconds (or adjust to match audio length)
    alert("O-H-I-O! Go Buckeyes!");
}

const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            activateGameMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateGameMode() {
    const gameQuotes = [
        "You're filled with determination.",
        "No cost too great.",
        "I am thou, thou art I..."
    ];
    const randomQuote = gameQuotes[Math.floor(Math.random() * gameQuotes.length)];
    alert(randomQuote);
}

document.getElementById('roll-dice').addEventListener('click', function() {
    const result = Math.floor(Math.random() * 20) + 1;
    document.getElementById('dice-result').textContent = `You rolled a ${result}!`;
    if (result === 20) {
        alert('Critical hit! You defeated the bug in your code!');
    } else if (result === 1) {
        alert('Critical fail! Your code has a syntax error!');
    }
});