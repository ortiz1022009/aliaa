// Configuración
const CONFIG = {
    TYPING_SPEED: 80,
    COUNTER_DURATION: 2000,
    ANIMATION_DELAY: 100
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupAnimations();
    setupCounters();
    setupDownload();
    setupScrollEffects();
    createParticles();
}

// Navegación
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones
function setupAnimations() {
    // Observador de intersección
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Activar contadores si es la sección de stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                
                // Animar tarjetas con delay
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('screenshots-grid') ||
                    entry.target.classList.contains('contact-grid')) {
                    animateCards(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.hero-stats, .features-grid, .screenshots-grid, .contact-grid, .download-content').forEach(el => {
        observer.observe(el);
    });
    
    // Preparar elementos para animación
    document.querySelectorAll('.feature-card, .screenshot-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Animar tarjetas con delay escalonado
function animateCards(container) {
    const cards = container.querySelectorAll('.feature-card, .screenshot-item, .contact-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * CONFIG.ANIMATION_DELAY);
    });
}

// Contadores animados
function setupCounters() {
    window.animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / (CONFIG.COUNTER_DURATION / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (target >= 500000) {
                        counter.textContent = Math.floor(current / 1000) + 'K+';
                    } else if (target >= 25000) {
                        counter.textContent = Math.floor(current / 1000) + 'K+';
                    } else {
                        counter.textContent = Math.ceil(current) + (target === 98 ? '%' : '');
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 500000) {
                        counter.textContent = '500K+';
                    } else if (target >= 25000) {
                        counter.textContent = '25K+';
                    } else {
                        counter.textContent = target + (target === 98 ? '%' : '');
                    }
                }
            };
            
            updateCounter();
        });
    };
}

// Sistema de descarga
function setupDownload() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleDownload();
    });
}

function handleDownload() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');
    
    if (isAndroid) {
        showDownloadModal();
    } else {
        showInstructionsModal();
    }
}

function showDownloadModal() {
    const modal = createModal(
        'Descargar Alia v3.0',
        `
        <div class="download-modal">
            <div class="modal-icon">
                <i class="fab fa-android"></i>
            </div>
            <h3>¡Descarga Alia para Android!</h3>
            <p>Versión 3.0 - Compatible con Android 6.0+</p>
            
            <div class="download-features">
                <div class="feature-item">
                    <i class="fas fa-comments"></i>
                    <span>Chat inteligente mejorado</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-image"></i>
                    <span>Análisis de imágenes avanzado</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-microphone"></i>
                    <span>Reconocimiento de voz</span>
                </div>
            </div>
            
            <div class="modal-buttons">
                <button onclick="downloadAPK()" class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    Descargar APK
                </button>
                <button onclick="copyDownloadLink()" class="btn btn-secondary">
                    <i class="fas fa-link"></i>
                    Copiar Enlace
                </button>
            </div>
            
            <div class="download-note">
                <i class="fas fa-info-circle"></i>
                <span>Habilita "Fuentes desconocidas" en configuración para instalar</span>
            </div>
        </div>
        `
    );
    document.body.appendChild(modal);
}

function showInstructionsModal() {
    const modal = createModal(
        'Instrucciones de Descarga',
        `
        <div class="instructions-modal">
            <div class="instruction-header">
                <i class="fas fa-mobile-alt"></i>
                <h3>Alia está disponible para Android</h3>
            </div>
            
            <div class="instruction-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Escanea el código QR</h4>
                        <p>Usa tu dispositivo Android para escanear el código QR de la página</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>O copia el enlace</h4>
                        <div class="link-box">
                            https://github.com/keymastered/alia/releases/latest
                        </div>
                        <button onclick="copyDownloadLink()" class="btn btn-outline">
                            <i class="fas fa-copy"></i> Copiar
                        </button>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Instala la aplicación</h4>
                        <p>Habilita "Fuentes desconocidas" en Configuración > Seguridad</p>
                    </div>
                </div>
            </div>
        </div>
        `
    );
    document.body.appendChild(modal);
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button onclick="closeModal(this)" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    });
    
    // Animar entrada
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    return modal;
}

window.closeModal = function(button) {
    const modal = button.closest('.modal-overlay');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300);
};

window.downloadAPK = function() {
    showNotification('Descarga iniciada - Alia v3.0', 'success');
    
    // Simular descarga (en producción sería la URL real)
    const link = document.createElement('a');
    link.href = '#'; // URL real del APK
    link.download = 'Alia_v3.0.apk';
    link.click();
};

window.copyDownloadLink = function() {
    const link = 'https://github.com/keymastered/alia/releases/latest';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            showNotification('Enlace copiado al portapapeles', 'success');
        });
    } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Enlace copiado al portapapeles', 'success');
    }
};

// Efectos de scroll
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 22, 37, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(26, 22, 37, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Parallax suave
    const parallaxElements = document.querySelectorAll('.particles-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Crear partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(124, 77, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleMove ${Math.random() * 20 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Estilos dinámicos
const dynamicStyles = `
    @keyframes particleMove {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .modal-overlay.show {
        opacity: 1;
    }
    
    .modal-content {
        background: var(--bg-card);
        border-radius: var(--border-radius-lg);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: var(--shadow-primary);
        border: 1px solid var(--border-color);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal-overlay.show .modal-content {
        transform: scale(1);
    }
    
    .modal-header {
        padding: 24px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--bg-secondary);
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    }
    
    .modal-header h2 {
        margin: 0;
        color: var(--text-primary);
        font-size: 1.5rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: var(--transition-fast);
    }
    
    .modal-close:hover {
        background: var(--bg-glass);
        color: var(--text-primary);
    }
    
    .modal-body {
        padding: 24px;
    }
    
    .download-modal,
    .instructions-modal {
        text-align: center;
    }
    
    .modal-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 2.5rem;
        color: white;
        box-shadow: var(--shadow-glow);
    }
    
    .download-features {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 24px 0;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: var(--bg-glass);
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        text-align: left;
    }
    
    .feature-item i {
        color: var(--primary-color);
        width: 20px;
    }
    
    .modal-buttons {
        display: flex;
        gap: 12px;
        margin: 24px 0;
        flex-wrap: wrap;
    }
    
    .modal-buttons .btn {
        flex: 1;
        min-width: 140px;
    }
    
    .download-note {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: rgba(255, 152, 0, 0.1);
        border: 1px solid #ff9800;
        border-radius: var(--border-radius);
        font-size: 0.9rem;
        color: #ff9800;
        text-align: left;
    }
    
    .instruction-steps {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-top: 24px;
    }
    
    .step {
        display: flex;
        gap: 16px;
        text-align: left;
    }
    
    .step-number {
        width: 32px;
        height: 32px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        flex-shrink: 0;
    }
    
    .step-content h4 {
        margin-bottom: 8px;
        color: var(--text-primary);
    }
    
    .step-content p {
        color: var(--text-secondary);
        margin-bottom: 12px;
    }
    
    .link-box {
        background: var(--bg-secondary);
        padding: 12px;
        border-radius: var(--border-radius);
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--primary-color);
        margin-bottom: 12px;
        word-break: break-all;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: 16px 20px;
        box-shadow: var(--shadow-card);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #4caf50;
    }
    
    .notification-error {
        border-left: 4px solid #f44336;
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-primary);
    }
    
    .notification-success .notification-content i {
        color: #4caf50;
    }
    
    .notification-error .notification-content i {
        color: #f44336;
    }
    
    .notification-info .notification-content i {
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 20px;
            border-top: 1px solid var(--border-color);
            box-shadow: var(--shadow-card);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .modal-buttons {
            flex-direction: column;
        }
        
        .modal-buttons .btn {
            width: 100%;
        }
    }
`;

// Agregar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);