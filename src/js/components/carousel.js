import { loadSuperheroesData } from '../services/dataService.js';

export async function initCarousel() {
    // Destruir cualquier instancia previa del carrusel
    if ($('.carousel').hasClass('slick-initialized')) {
        $('.carousel').slick('unslick');
    }

    const superheroes = await loadSuperheroesData();
    const carouselElement = $('.carousel');
    carouselElement.empty(); // Clear existing static content

    // Referencias a los elementos del overlay
    const overlay = document.getElementById('superheroDetailOverlay');
    const detailImage = overlay.querySelector('.detail-image');
    const detailName = overlay.querySelector('.detail-name');
    const detailStory = overlay.querySelector('.detail-story');
    const detailCityMutationAge = overlay.querySelector('.detail-city-mutation-age');
    const closeBtn = overlay.querySelector('.close-detail');

    superheroes.forEach(hero => {
        const ficha = `
            <div class="ficha" data-nombre="${hero.Nombre}">
                <div class="ficha-imagen">
                    <img src="${hero.Imagen}" alt="${hero.Nombre}" style="object-position: ${hero.ObjetoPosicion || 'center'};" onerror="this.onerror=null; this.src='assets/images/logos/LOGOTIPO-AEIQSEC2-HORIZONTAL.svg';">
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
        const appendedFicha = $(ficha);
        carouselElement.append(appendedFicha);

        // Añadir evento clic a cada ficha
        appendedFicha.on('click', function() {
            detailImage.src = hero.Imagen;
            detailImage.alt = hero.Nombre;
            detailImage.style.objectPosition = hero.ObjetoPosicion || 'center';
            detailName.textContent = hero.Nombre;
            detailStory.textContent = hero.Historia;
            detailCityMutationAge.innerHTML = `Ciudad: ${hero.Ciudad} | Mutación: ${hero.Mutacion} | Edad: ${hero.Edad}`;
            overlay.style.display = 'flex'; // Mostrar el overlay
        });
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

    // Funcionalidad para cerrar el overlay
    closeBtn.onclick = function() {
        overlay.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    };
} 