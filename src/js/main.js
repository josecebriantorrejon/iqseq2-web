import { initCarousel } from './components/carousel.js';
import { initMap } from './components/map.js';
import { initContactForm } from './components/form.js';

// Inicializar componentes cuando el DOM esté listo
$(document).ready(async function() {
    await initCarousel();
    await initMap();
    initContactForm();

    const $hamburger = $('.hamburger');
    const $nav = $('#main-nav');

    $hamburger.on('click', function() {
        const isOpen = $nav.hasClass('open');
        $nav.toggleClass('open', !isOpen);
        $(this).toggleClass('active', !isOpen);
        $(this).attr('aria-expanded', String(!isOpen));
        $(this).attr('aria-label', !isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    $('#main-nav a').on('click', function() {
        $nav.removeClass('open');
        $hamburger.removeClass('active').attr('aria-expanded', 'false').attr('aria-label', 'Abrir menú');
    });
}); 