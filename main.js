// Inicialización del carrusel
$(document).ready(function(){
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
});

// Inicialización del mapa
document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        center: [40.4168, -3.7038],
        zoom: 5,
        zoomControl: true,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        attributionControl: true
    });

    // Usar un estilo de mapa más suave y decorativo
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        opacity: 0.7
    }).addTo(map);

    // Estilo personalizado para los marcadores con corazón
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-heart"><i class="fas fa-heart"></i><span class="marker-count"></span></div>',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    // Datos de las ciudades con todos los niños
    const ciudades = [
        {
            nombre: "Madrid",
            coordenadas: [40.4168, -3.7038],
            pacientes: [
                { nombre: "Pablo", año: "2007" },
                { nombre: "Dario", año: "2015" },
                { nombre: "Joel", año: "2018", mutacion: "Exon 5" },
                { nombre: "Ares", año: "2010", mutacion: "Exon 15" },
                { nombre: "Odei", año: "2015" }
            ]
        },
        {
            nombre: "Barcelona",
            coordenadas: [41.3851, 2.1734],
            pacientes: [
                { nombre: "Judith", año: "2015", mutacion: "Exon 12" }
            ]
        },
        {
            nombre: "Valencia",
            coordenadas: [39.4699, -0.3763],
            pacientes: [
                { nombre: "Miquel", año: "2023" }
            ]
        },
        {
            nombre: "A Coruña",
            coordenadas: [43.3623, -5.8493],
            pacientes: [
                { nombre: "Brais", año: "2016", mutacion: "Exon 13" }
            ]
        },
        {
            nombre: "Vigo",
            coordenadas: [42.2406, -8.7207],
            pacientes: [
                { nombre: "Maria", año: "1985" }
            ]
        },
        {
            nombre: "Santander",
            coordenadas: [43.3628, -3.8196],
            pacientes: [
                { nombre: "Adriana", año: "2018", mutacion: "Intron 14" }
            ]
        },
        {
            nombre: "Gerona",
            coordenadas: [41.9794, 2.8214],
            pacientes: [
                { nombre: "Noah", año: "2022" }
            ]
        },
        {
            nombre: "Granada",
            coordenadas: [37.1882, -3.6067],
            pacientes: [
                { nombre: "Dario", año: "2015" }
            ]
        },
        {
            nombre: "Almería",
            coordenadas: [36.8408, -2.4637],
            pacientes: [
                { nombre: "Nerea", año: "2008" }
            ]
        }
    ];

    // Añadir marcadores con estilo personalizado
    ciudades.forEach(ciudad => {
        const marker = L.marker(ciudad.coordenadas, { icon: customIcon }).addTo(map);
        const countSpan = marker.getElement().querySelector('.marker-count');
        countSpan.textContent = ciudad.pacientes.length;

        // Crear contenido del popup con todos los pacientes
        const popupContent = `
            <div class="mapa-popup">
                <h3>${ciudad.nombre}</h3>
                <div class="pacientes-lista">
                    ${ciudad.pacientes.map(paciente => `
                        <div class="paciente-item">
                            <strong>${paciente.nombre} (${paciente.año})</strong>
                            ${paciente.mutacion ? `<br><span class="mutacion">${paciente.mutacion}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        marker.bindPopup(popupContent);
    });

    // Manejo del formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría el código para manejar el envío del formulario
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });

    // Datos completos de los pacientes para el modal
    const pacientesData = [
        {
            nombre: "MAIA",
            ciudad: "Segovia",
            mutacion: "Sin especificar",
            edad: "2019",
            genero: "Femenino",
            historia: "Maia es una niña muy risueña y juguetona. Le encanta pasar tiempo al aire libre y disfrutar de la naturaleza. A pesar de los desafíos, siempre tiene una sonrisa y nos enseña a todos el valor de la resiliencia.",
            imagen: "images/superheroes/MAIA.jpg"
        },
        {
            nombre: "JORDI",
            ciudad: "Tarragona",
            mutacion: "Sin especificar",
            edad: "2012",
            genero: "Masculino",
            historia: "Jordi es un niño enérgico con una pasión por la música. Disfruta de la compañía de sus amigos y siempre está dispuesto a aprender cosas nuevas. Su optimismo es contagioso y es una inspiración para todos.",
            imagen: "images/superheroes/JORDI.jpg"
        },
        {
            nombre: "JUDITH",
            ciudad: "Málaga",
            mutacion: "Exon 12",
            edad: "2015",
            genero: "Femenino",
            historia: "Judith es una niña creativa y curiosa, le encanta dibujar y contar historias. Su imaginación no tiene límites y su alegría ilumina cada día. Es un ejemplo de perseverancia y amor.",
            imagen: "images/superheroes/JUDITH.jpeg"
        },
        {
            nombre: "NOAH",
            ciudad: "Gerona",
            mutacion: "Sin especificar",
            edad: "2022",
            genero: "Masculino",
            historia: "Noah es un bebé lleno de energía y vitalidad, siempre explorando el mundo con una sonrisa. Su espíritu aventurero nos inspira a disfrutar cada pequeño momento.",
            imagen: "images/superheroes/NOAH.jpg"
        },
        {
            nombre: "ADRIANA",
            ciudad: "Cantabria",
            mutacion: "Intron 14",
            edad: "2018",
            genero: "Femenino",
            historia: "Adriana es una niña valiente y decidida, con una personalidad vibrante. Le encanta aprender y jugar, demostrando cada día su fuerza y ganas de vivir. Es un ejemplo de superación constante.",
            imagen: "images/superheroes/ADRIANA.jpeg"
        },
        {
            nombre: "MIQUEL",
            ciudad: "Valencia",
            mutacion: "Sin especificar",
            edad: "2023",
            genero: "Masculino",
            historia: "Miquel es un pequeño luchador, con una mirada llena de esperanza y un espíritu inquebrantable. Su sonrisa es un faro de alegría para su familia, que le acompaña en cada paso de su camino.",
            imagen: "images/superheroes/MIQUEL.jpeg"
        },
        {
            nombre: "JOEL",
            ciudad: "Madrid",
            mutacion: "Exon 5",
            edad: "2018",
            genero: "Masculino",
            historia: "Joel es un niño activo y curioso, siempre buscando nuevas aventuras. Su energía y determinación son una fuente de inspiración para todos los que le rodean. Su espíritu alegre es contagioso.",
            imagen: "images/superheroes/JOEL.jpeg"
        },
        {
            nombre: "BRAIS",
            ciudad: "Coruña",
            mutacion: "Exon 13",
            edad: "2016",
            genero: "Masculino",
            historia: "Brais es un niño lleno de vitalidad y una sonrisa que ilumina cualquier lugar. A pesar de los desafíos, siempre encuentra la manera de disfrutar y compartir su alegría con los demás.",
            imagen: "images/logos/LOGOTIPO-AEIQSEC2-VERTICAL.svg"
        },
        {
            nombre: "DARIO",
            ciudad: "Granada",
            mutacion: "Sin especificar",
            edad: "2015",
            genero: "Masculia",
            historia: "Dario es un niño que nos sorprende cada día con su capacidad de superación y su espíritu incansable. Su dulzura y su cariño son un regalo para quienes le rodean.",
            imagen: "images/logos/LOGOTIPO-AEIQSEC2-VERTICAL.svg"
        },
        {
            nombre: "ARES",
            ciudad: "Madrid",
            mutacion: "Exon 15",
            edad: "2010",
            genero: "Masculino",
            historia: "Ares es un niño con una fortaleza increíble y una curiosidad insaciable. Le encanta explorar y aprender cosas nuevas, y su valentía es una inspiración para todos.",
            imagen: "images/superheroes/ARES.jpg"
        },
        {
            nombre: "PABLO",
            ciudad: "Madrid",
            mutacion: "Sin especificar",
            edad: "2007",
            genero: "Masculino",
            historia: "Pablo es un joven con un espíritu resiliente y una capacidad admirable para superar obstáculos. Su determinación y su alegría de vivir son un verdadero ejemplo para todos.",
            imagen: "images/logos/LOGOTIPO-AEIQSEC2-VERTICAL.svg"
        },
        {
            nombre: "ODEI",
            ciudad: "Madrid",
            mutacion: "Sin especificar",
            edad: "2015",
            genero: "Femenino",
            historia: "Odei es una niña llena de luz y dulzura, con una mirada que irradia pura felicidad. Su capacidad para inspirar a quienes la rodean es inmensa. Siempre nos recuerda lo que realmente importa en la vida.",
            imagen: "images/superheroes/ODEI.jpg"
        },
        {
            nombre: "NEREA",
            ciudad: "Almería",
            mutacion: "Sin especificar",
            edad: "2008",
            genero: "Femenino",
            historia: "Nerea es una niña muy cariñosa y valiente, que enfrenta cada día con una sonrisa. Le encanta jugar y aprender, y su espíritu luchador es una inspiración para todos.",
            imagen: "images/superheroes/NEREA.jpg"
        },
        {
            nombre: "MARIA",
            ciudad: "Vigo",
            mutacion: "Sin especificar",
            edad: "1985",
            genero: "Femenino",
            historia: "Maria es un ejemplo de fortaleza y perseverancia. Su historia de vida es un testimonio de superación, y su actitud positiva es una fuente de inspiración para todos nosotros.",
            imagen: "images/superheroes/MARIA.jpg"
        }
    ];

    // Lógica para el modal
    const fichaModal = document.getElementById('fichaModal');
    const closeButton = document.querySelector('.close-button');
    const modalBody = document.querySelector('.modal-body');
    const carousel = document.querySelector('.carousel');

    // Asegurarse de que el modal esté oculto al inicio
    fichaModal.style.display = 'none';

    carousel.addEventListener('click', function(event) {
        const ficha = event.target.closest('.ficha');
        if (ficha) {
            const nombrePaciente = ficha.dataset.nombre;
            const paciente = pacientesData.find(p => p.nombre === nombrePaciente);

            if (paciente) {
                const generoIcon = paciente.genero === 'Masculino' ? '<i class="fas fa-mars"></i>' : '<i class="fas fa-venus"></i>';
                const mutacionTag = paciente.mutacion !== 'Sin especificar' ? `<div class="mutacion-tag">${paciente.mutacion}</div>` : '';

                modalBody.innerHTML = `
                    <div class="ficha-imagen">
                        <img src="${paciente.imagen}" alt="${paciente.nombre}">
                    </div>
                    <h3>${paciente.nombre}</h3>
                    <p class="ciudad">${paciente.ciudad}</p>
                    ${mutacionTag}
                    <p class="edad">${paciente.edad}</p>
                    <p>${paciente.historia}</p>
                    <ul>
                        <li>${generoIcon} Género: ${paciente.genero}</li>
                        <li><i class="fas fa-map-marker-alt"></i> Ciudad: ${paciente.ciudad}</li>
                        <li><i class="fas fa-birthday-cake"></i> Año de nacimiento: ${paciente.edad}</li>
                        <li><i class="fas fa-dna"></i> Mutación: ${paciente.mutacion}</li>
                    </ul>
                `;
                fichaModal.style.display = 'flex';
            }
        }
    });

    closeButton.addEventListener('click', function() {
        fichaModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === fichaModal) {
            fichaModal.style.display = 'none';
        }
    });
}); 