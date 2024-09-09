particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ["#667eea", "#764ba2", "#6B8DD6", "#8E37D7"] },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
        },
        opacity: {
            value: 0.6,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#667eea",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 200,
                size: 6,
                duration: 0.3,
                opacity: 1,
                speed: 3
            },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});


document.addEventListener('DOMContentLoaded', (event) => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const isExpanded = navMenu.classList.contains('show');
        navToggle.setAttribute('aria-expanded', isExpanded);
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

    // Custom smooth scrolling functionality
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 60; // Adjust this value if you have a fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1000; // Adjust this value to change the scrolling speed
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    }

    // Add smooth scrolling to nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
        });
    });

    // Update copyright year
    updateCopyrightYear();
});

function playOhioStateAnthem() {
    const audio = new Audio('https://www.osu.edu/assets/downloads/audio/ringtones/BuckeyeBattleCry-Music.mp3');
    audio.play();
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

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('copyright-year');
    if (copyrightElement) {
        copyrightElement.textContent = currentYear;
    }
}
