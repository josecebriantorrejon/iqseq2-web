import { initCarousel } from './components/carousel.js';
import { initMap } from './components/map.js';
import { initModals } from './components/modal.js';
import { initContactForm } from './components/form.js';

// Inicializar componentes cuando el DOM esté listo
$(document).ready(function() {
    initCarousel();
    initModals();
    initContactForm();
});

// Inicializar el mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMap();
}); 