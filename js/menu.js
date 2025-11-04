/**
 * js/menu.js
 * Injeta dinamicamente o cabeçalho e menu de navegação, e adiciona a lógica de Menu Hambúrguer (Mobile-First).
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Definição do HTML do Cabeçalho com o Botão Hambúrguer
    const headerHTML = `
        <header class="main-header">
            <div class="logo">
                <h1>Jornada HTML5</h1>
            </div>
            
            <button class="menu-toggle" aria-controls="main-nav" aria-expanded="false">
                <span class="hamburger"></span>
            </button>

            <nav class="main-nav" id="main-nav">
                <ul>
                    <li><a href="index.html">Mapa Principal</a></li>
                    <li><a href="historia.html">História</a></li>
                    <li><a href="iniciante.html">Nível Iniciante</a></li>
                    <li><a href="intermediario.html">Nível Intermediário</a></li>
                    <li><a href="avancado.html">Nível Avançado</a></li>
                    <li><a href="profissional.html">Nível Profissional</a></li>
                </ul>
            </nav>
        </header>
    `;

    // 2. Injeção no topo do corpo do documento
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;
    document.body.prepend(tempDiv.firstElementChild); // Injeta o <header>

    // 3. Lógica do Menu Hambúrguer (Toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        // Função para alternar a classe 'is-open'
        const toggleMenu = () => {
            const isOpen = mainNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-open', isOpen);
            
            // Atualiza o estado ARIA para acessibilidade
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : ''; // Evita a rolagem do fundo no mobile
        };

        // Escuta o clique no botão hambúrguer
        menuToggle.addEventListener('click', toggleMenu);

        // Fecha o menu ao clicar em um link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    toggleMenu();
                }
            });
        });
        
        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 901 && mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    }
});