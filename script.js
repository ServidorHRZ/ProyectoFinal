document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Funcionalidad de tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            const container = this.closest('.media-container');
            
            // Actualizar botones
            container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Actualizar contenido
            container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            container.querySelector(`#${tabId}`).classList.add('active');
        });
    });

    // Funcionalidad de galería de imágenes
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => {
        const items = gallery.querySelectorAll('.gallery-item');
        let currentIndex = 0;

        // Mostrar primera imagen
        items[0].classList.add('active');

        // Botones de navegación
        const prevBtn = gallery.parentElement.querySelector('.prev');
        const nextBtn = gallery.parentElement.querySelector('.next');

        prevBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].classList.add('active');
        });

        nextBtn.addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        });
    });

    // Función para resaltar sintaxis
    function highlightCode() {
        document.querySelectorAll('pre code').forEach(block => {
            // Palabras clave comunes
            const keywords = ['function', 'var', 'let', 'const', 'if', 'else', 'return', 'for', 'while'];
            
            block.innerHTML = block.innerHTML
                // Resaltar palabras clave
                .replace(new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g'), '<span class="keyword">$1</span>')
                // Resaltar strings
                .replace(/(["'])(.*?)\1/g, '<span class="string">$1$2$1</span>')
                // Resaltar comentarios
                .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
                // Resaltar números
                .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
        });
    }

    // Llamar a la función directamente
    highlightCode();
});
