import { loadSuperheroesData } from '../services/dataService.js';

export async function initMap() {
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

    const superheroes = await loadSuperheroesData();

    // Group superheroes by city and parse coordinates
    const groupedByCity = {};
    superheroes.forEach(hero => {
        const cityName = hero.Ciudad;
        const lat = parseFloat(hero.Latitud);
        const lon = parseFloat(hero.Longitud);

        if (cityName && !isNaN(lat) && !isNaN(lon)) {
            if (!groupedByCity[cityName]) {
                groupedByCity[cityName] = {
                    nombre: cityName,
                    coordenadas: [lat, lon],
                    pacientes: []
                };
            }
            groupedByCity[cityName].pacientes.push({
                nombre: hero.Nombre,
                año: hero.Edad, // 'Edad' from CSV maps to 'año'
                mutacion: hero.Mutacion,
                historia: hero.Historia
            });
        }
    });

    const citiesData = Object.values(groupedByCity);

    // Añadir marcadores con estilo personalizado
    citiesData.forEach(ciudad => {
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
                            ${(paciente.mutacion && paciente.mutacion !== 'Sin especificar') ? `<br><span class="mutacion">Mutación: ${paciente.mutacion}</span>` : ''}
                            ${(paciente.historia) ? `<br><span class="historia">Historia: ${paciente.historia}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
} 