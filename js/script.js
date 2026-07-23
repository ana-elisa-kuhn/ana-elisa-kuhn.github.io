// ==================== DARK MODE TOGGLE ====================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Íconos SVG del toggle: medio círculo (ir a claro) y luna (ir a oscuro)
const ICONO_SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>';
const ICONO_LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

// Tema guardado, o el preferido del sistema si aún no hay elección
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = ICONO_SOL;
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = ICONO_SOL;
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = ICONO_LUNA;
    }
});

// ==================== MENÚ MÓVIL (HAMBURGUESA) ====================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Cerrar el menú al elegir una sección
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR STICKY EFFECT ====================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ==================== FILTER PROJECTS ====================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card, .cert-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al clickeado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                // Reiniciar la animación: quitarla, forzar reflow y volver a aplicarla
                card.style.animation = 'none';
                void card.offsetWidth;
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== INTERSECTION OBSERVER (Animaciones) ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos animables
document.querySelectorAll('.project-card, .stat-card, .process-step, .cert-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==================== CONTADOR DE CERTIFICACIONES ====================

const certCounter = document.getElementById('certCounter');
if (certCounter) {
    const total = document.querySelectorAll('.cert-card').length;

    const animarConteo = () => {
        let current = 0;
        const timer = setInterval(() => {
            current++;
            certCounter.textContent = current;
            if (current >= total) {
                clearInterval(timer);
            }
        }, 50);
    };

    // Arrancar el conteo solo cuando el contador entra en pantalla
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarConteo();
                obs.disconnect();
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(certCounter);
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--secondary-color)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});
