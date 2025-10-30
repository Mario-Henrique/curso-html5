/**
 * js/menu.js
 * Injeta dinamicamente o cabeçalho e menu de navegação em todas as páginas.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Definição do HTML do Cabeçalho
    // Este é o mesmo conteúdo do <header> do seu index.html e história.html,
    // mas atualizado para usar links relativos ou absolutos conforme a estrutura.
    const headerHTML = `
        <header class="main-header">
            <div class="logo">
                <h1>Jornada HTML5</h1>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="index.html">Mapa Principal</a></li>
                    <li><a href="historia.html">História</a></li>
                    <li><a href="nv1.html">Nível Iniciante</a></li>
                    <li><a href="#">Nível Intermediário</a></li>
                    <li><a href="#">Nível Avançado</a></li>
                </ul>
            </nav>
        </header>
    `;

    // 2. Criação de um elemento container temporário (por exemplo, uma div)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;

    // 3. Injeção no topo do corpo do documento
    // O menu será o primeiro elemento dentro do <body>
    document.body.prepend(tempDiv);
});