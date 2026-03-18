/* ================== SCROLL REVEAL + STAGGER ================== */
const revealTargets = document.querySelectorAll(
    '.servicio, .stack-item, .proyecto-card, .contacto-card, .exp-card, .shopian-features li'
);

// Stagger: asignar transition-delay inline a elementos del mismo tipo
const staggerSelectors = [
    '.servicio', '.stack-item', '.proyecto-card',
    '.contacto-card', '.exp-card', '.shopian-features li'
];

staggerSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
        el.style.transitionDelay = `${i * 100}ms`;
    });
});

// Reveal individual (secciones grandes)
const revealSections = document.querySelectorAll(
    '#sobremi .contenedor-foto, #sobremi .sobremi, .experiencia-intro, .shopian-info, .shopian-mockup, ' +
    '#servicios h2, #portfolio h2, #portfolio .portfolio-subtitulo, ' +
    '#contacto h2, #contacto .contacto-subtitulo, .contenedor-skills h2'
);

[...revealTargets, ...revealSections].forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

[...revealTargets, ...revealSections].forEach(el => observer.observe(el));

// Limpiar stagger delay una vez que animó (para no bloquear re-hover)
revealTargets.forEach(el => {
    el.addEventListener('transitionend', () => {
        el.style.transitionDelay = '0ms';
    }, { once: true });
});


/* ================== TYPEWRITER ================== */
const tw = document.getElementById('typewriter');
const words = ['Frontend Developer', 'React Developer', 'TypeScript Dev'];
let wIdx = 0, cIdx = 0, deleting = false;

function type() {
    const word = words[wIdx];
    tw.textContent = deleting
        ? word.substring(0, cIdx - 1)
        : word.substring(0, cIdx + 1);

    deleting ? cIdx-- : cIdx++;

    let delay = deleting ? 55 : 105;

    if (!deleting && cIdx === word.length) {
        delay = 2000;
        deleting = true;
    } else if (deleting && cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
        delay = 350;
    }

    setTimeout(type, delay);
}

setTimeout(type, 900);


/* ================== HEADER SCROLL ================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ================== ACTIVE NAV ON SCROLL ================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#links a');

const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(a => {
                a.classList.toggle('seleccionado', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => navObs.observe(s));


/* ================== SCROLL INDICATOR FADE ================== */
const scrollInd = document.querySelector('.scroll-indicator');
if (scrollInd) {
    window.addEventListener('scroll', () => {
        scrollInd.style.opacity = window.scrollY > 80 ? '0' : '0.45';
    }, { passive: true });
}


/* ================== RESPONSIVE MENU ================== */
const nav = document.getElementById('nav');

function responsiveMenu() {
    nav.classList.toggle('responsive');
}

document.querySelectorAll('#links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('responsive'));
});


/* ================== SCROLL TO TOP ================== */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ================== MODALES ================== */
const overlay     = document.getElementById('modal-overlay');
const container   = document.getElementById('modal-container');
const closeBtn    = document.getElementById('modal-close-btn');
const mImg        = document.getElementById('modal-img');
const mBadge      = document.getElementById('modal-badge-el');
const mTitle      = document.getElementById('modal-title');
const mDesc       = document.getElementById('modal-desc');
const mStack      = document.getElementById('modal-stack');
const mGithub     = document.getElementById('modal-github');

let lastFocus = null;

function openModal(card) {
    mImg.src         = card.dataset.img || '';
    mImg.alt         = card.dataset.title || '';
    mTitle.textContent = card.dataset.title || '';
    mDesc.textContent  = card.dataset.desc  || '';
    mGithub.href       = card.dataset.github || '#';

    const badge = card.dataset.badge || '';
    mBadge.textContent  = badge;
    mBadge.style.display = badge ? 'inline-flex' : 'none';

    const stack = JSON.parse(card.dataset.stack || '[]');
    mStack.innerHTML = stack.map(t => `<span>${t}</span>`).join('');

    lastFocus = document.activeElement;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 60);
}

function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
    setTimeout(() => { mImg.src = ''; }, 350);
}

// Click en tarjetas
document.querySelectorAll('.proyecto-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card);
        }
    });
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
});

// Focus trap
container.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = container.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
