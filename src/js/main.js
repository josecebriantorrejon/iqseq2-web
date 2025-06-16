import { initCarousel } from './components/carousel.js';
import { initMap } from './components/map.js';
import { initContactForm } from './components/form.js';

// Inicializar componentes cuando el DOM esté listo
$(document).ready(async function() {
    await initCarousel();
    await initMap();
    initContactForm();
}); 