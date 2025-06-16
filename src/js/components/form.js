export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría el código para manejar el envío del formulario
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
} 