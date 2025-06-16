import { pacientesData } from '../data/patients.js';

export function initModals() {
    // Crear el modal dinámicamente
    const modalHTML = `
        <div id="patientModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="modal-body">
                    <div class="patient-image"></div>
                    <div class="patient-info">
                        <h2 class="patient-name"></h2>
                        <div class="patient-details"></div>
                        <p class="patient-story"></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('patientModal');
    const closeBtn = modal.querySelector('.close');

    // Función para mostrar el modal con la información del paciente
    window.showPatientModal = function(patientName) {
        const patient = pacientesData.find(p => p.nombre === patientName);
        if (!patient) return;

        modal.querySelector('.patient-name').textContent = patient.nombre;
        modal.querySelector('.patient-image').innerHTML = `<img src="${patient.imagen}" alt="${patient.nombre}">`;
        modal.querySelector('.patient-details').innerHTML = `
            <p><strong>Ciudad:</strong> ${patient.ciudad}</p>
            <p><strong>Edad:</strong> ${patient.edad}</p>
            <p><strong>Género:</strong> ${patient.genero}</p>
            <p><strong>Mutación:</strong> ${patient.mutacion}</p>
        `;
        modal.querySelector('.patient-story').textContent = patient.historia;

        modal.style.display = 'block';
    };

    // Cerrar el modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
} 