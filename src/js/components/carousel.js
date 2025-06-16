import { loadSuperheroesData } from '../services/dataService.js';

export async function initCarousel() {
    // Destruir cualquier instancia previa del carrusel
    if ($('.carousel').hasClass('slick-initialized')) {
        $('.carousel').slick('unslick');
    }

    const superheroes = await loadSuperheroesData();
    const carouselElement = $('.carousel');
    carouselElement.empty(); // Clear existing static content

    superheroes.forEach(hero => {
        const ficha = `
            <div class="ficha" data-nombre="${hero.Nombre}">
                <div class="ficha-imagen">
                    <img src="${hero.Imagen}" alt="${hero.Nombre}" style="object-position: ${hero.ObjetoPosicion || 'center'};" onerror="this.onerror=null; this.src='assets/images/logos/LOGOTIPO-AEIQSEC2-COLOR.svg';">
                </div>
                <div class="ficha-contenido">
                    <h3>${hero.Nombre}</h3>
                    <p class="ciudad">${hero.Ciudad}</p>
                    <div class="mutacion-tag">${hero.Mutacion}</div>
                    <p class="edad">${hero.Edad}</p>
                    <p class="historia">${hero.Historia}</p>
                </div>
            </div>
        `;
        carouselElement.append(ficha);
    });
    
    // Inicializar el carrusel con la configuración correcta
    carouselElement.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
} 