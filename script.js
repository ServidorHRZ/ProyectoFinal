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
        const prevBtn = gallery.querySelector('.prev');
        const nextBtn = gallery.querySelector('.next');
        let currentIndex = 0;

        // Mostrar primera imagen
        if (items.length > 0) {
            items[0].classList.add('active');
        }

        // Función para cambiar imagen
        function showImage(index) {
            items.forEach(item => item.classList.remove('active'));
            items[index].classList.add('active');
            currentIndex = index;
        }

        // Navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = (currentIndex - 1 + items.length) % items.length;
                showImage(newIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = (currentIndex + 1) % items.length;
                showImage(newIndex);
            });
        }
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

    // Funcionalidad del modal de imágenes
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close-modal');

    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            modal.style.display = "flex";
            modalImg.src = this.src;
            
            // Obtener el caption desde el elemento siguiente (div.caption)
            const caption = this.closest('.gallery-item').querySelector('.caption');
            modalCaption.textContent = caption ? caption.textContent : '';
            
            document.body.style.overflow = 'hidden';
        });
    });

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Agregar esta función al archivo script.js
    function copyCommand(button) {
        const commandBlock = button.parentElement;
        const commandText = commandBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(commandText).then(() => {
            const originalText = button.textContent;
            button.textContent = '¡Copiado!';
            button.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el comando:', err);
        });
    }
});
