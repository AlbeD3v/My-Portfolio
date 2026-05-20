document.addEventListener('DOMContentLoaded', () => {
    // Toggle Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Cargar preferencia guardada
    const temaGuardado = localStorage.getItem('tema');
    if (temaGuardado === 'oscuro') {
        document.documentElement.setAttribute('data-tema', 'oscuro');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const esOscuro = document.documentElement.getAttribute('data-tema') === 'oscuro';
        
        if (esOscuro) {
            document.documentElement.removeAttribute('data-tema');
            localStorage.setItem('tema', 'claro');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-tema', 'oscuro');
            localStorage.setItem('tema', 'oscuro');
            themeIcon.textContent = '☀️';
        }
    });

    // Animación de barras de habilidades al scroll
    const habilidades = document.querySelectorAll('.habilidad__progreso');
    
    const animarBarras = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ancho = entry.target.getAttribute('data-ancho');
                entry.target.style.width = ancho + '%';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver
    (animarBarras, {
        threshold: 0.5
    });
    
    habilidades.forEach(barra => observer.observe(barra));

    // Formulario de contacto con LocalStorage
    const formulario = document.getElementById('formulario-contacto');
    const mensajeExito = document.getElementById('mensaje-enviado');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const datos = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            tipo: document.getElementById('tipo').value,
            mensaje: document.getElementById('mensaje').value,
            fecha: new Date().toISOString()
        };
        
        // Guardar en LocalStorage
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes') || '[]');
        mensajesGuardados.push(datos);
        localStorage.setItem('mensajes', JSON.stringify(mensajesGuardados));
        
        // Mostrar mensaje
        formulario.reset();
        mensajeExito.hidden = false;
        
        // Mostrar en consola (para debug)
        console.log('Mensajes guardados:', mensajesGuardados);
        
        setTimeout(() => {
            mensajeExito.hidden = true;
        }, 5000);
    });
});