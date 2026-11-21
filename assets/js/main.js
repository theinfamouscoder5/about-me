const navbar = document.getElementById('navbar');

const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
const navTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

let clickedTarget = null;
let clickedAt = 0;

function syncNavbar() {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 25);
}

function setActive(section) {
    for (const link of navLinks) {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${section.id}`);
    }
}

function atBottomOfPage() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
}

function syncActiveLink() {
    // Projects and Contact share a scroll position, so keep the clicked link lit.
    if (clickedTarget && !atBottomOfPage() && performance.now() - clickedAt > 1200) {
        clickedTarget = null;
    }

    if (clickedTarget) {
        setActive(clickedTarget);
        return;
    }

    const marker = window.scrollY + navbar.offsetHeight + 48;
    let current = navTargets[0];

    for (const section of navTargets) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = section;
    }

    if (atBottomOfPage()) current = navTargets[navTargets.length - 1];

    setActive(current);
}

for (const link of navLinks) {
    link.addEventListener('click', () => {
        clickedTarget = document.querySelector(link.getAttribute('href'));
        clickedAt = performance.now();
        if (clickedTarget) setActive(clickedTarget);
    });
}

function syncPage() {
    syncNavbar();
    syncActiveLink();
}

syncPage();
window.addEventListener('scroll', syncPage, { passive: true });
window.addEventListener('resize', syncPage);
