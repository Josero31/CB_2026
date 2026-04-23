import { presentaciones } from './presentaciones.js';

const grid = document.querySelector('.presentations-grid');
const searchBar = document.getElementById('search-bar');

function createCardHTML(presentacion, index) {
    const paddedIndex = (index + 1).toString().padStart(2, '0');

    return `
        <div class="image-container">
            <img src="${presentacion.image}" alt="${presentacion.title}" loading="lazy">
        </div>
        <div class="card-content">
            <span class="card-number">Presentación ${paddedIndex}</span>
            <h2>${presentacion.title}</h2>
            <p>${presentacion.description}</p>
            <div class="card-action">
                <a href="${presentacion.path}" class="btn-glitch">Ver presentación</a>
            </div>
        </div>
    `;
}

function renderPresentaciones(searchTerm = '') {
    grid.innerHTML = '';
    const filtered = presentaciones.filter(p => {
        if (!p.active) return false;
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return p.title.toLowerCase().includes(term) ||
               p.description.toLowerCase().includes(term);
    });

    filtered.forEach((presentacion, index) => {
        const card = document.createElement('div');
        card.className = 'presentation-card';
        card.style.animationDelay = `${index * 100}ms`;
        card.innerHTML = createCardHTML(presentacion, index);
        grid.appendChild(card);
    });
}

renderPresentaciones();

searchBar.addEventListener('input', (event) => {
    renderPresentaciones(event.target.value);
});

const progressBar = document.querySelector('.scanline');

window.addEventListener('scroll', () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / documentHeight;
    progressBar.style.transform = `scaleX(${progress})`;
});

document.documentElement.style.scrollBehavior = 'smooth';
