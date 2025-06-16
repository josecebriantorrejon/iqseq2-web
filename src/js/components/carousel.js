export function initCarousel() {
    // Destruir cualquier instancia previa del carrusel
    if ($('.carousel').hasClass('slick-initialized')) {
        $('.carousel').slick('unslick');
    }
    
    // Inicializar el carrusel con la configuración correcta
    $('.carousel').slick({
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