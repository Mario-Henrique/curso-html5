// js/scroll-story.js - CORRIGIDO

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seletores dos Elementos Chave
    // Agora selecionamos todos os steps, independentemente do wrapper
    const storySteps = document.querySelectorAll('.story-step');
    const storyGraphic = document.querySelector('.story-graphic');
    const graphicImage = storyGraphic ? storyGraphic.querySelector('img') : null;
    const graphicLabel = storyGraphic ? storyGraphic.querySelector('.graphic-label') : null;

    // Se não houver elementos de história, encerra a função
    if (storySteps.length === 0 || !storyGraphic) {
        // ... (warn) ...
        return;
    }

    // 2. Configuração do Intersection Observer
    // rootMargin: '0px 0px -50% 0px' - Ativa quando o elemento entra na metade inferior da tela
    // e desativa quando sai da metade superior. Isso é ideal para o 100vh por etapa.
    const finalOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50% 0px', 
        threshold: 0 
    };

    // Configurações para a imagem/gráfico (ativa com 20% visível)
    const graphicOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    /**
     * Atualiza o estado da Story Graphic (Imagem Fixa).
     * @param {HTMLElement} activeStep O bloco de texto ativo no momento.
     */
    const updateGraphic = (activeStep) => {
        const year = activeStep.getAttribute('data-year');
        const title = activeStep.querySelector('h3').textContent.split(': ')[1] || activeStep.querySelector('h3').textContent;

        if (graphicLabel) {
            graphicLabel.textContent = `${year}: ${title}`;
        }
        
        // Simulação de troca de imagem (AJUSTAR CAMINHOS DE IMAGEM)
        if (graphicImage) {
            if (year === '1989') {
                // Imagem de Tim Berners-Lee
                graphicImage.src = './res/img/tim-berners-lee.webp'; 
            } else if (year === '1991') {
                // Imagem Logo HTML1
                graphicImage.src = './res/img/html1.0.webp';                 
            } else if (year === '1995') {
                // Imagem Guerra dos Browsers / Netscape
                graphicImage.src = './res/img/html2.0.png'; 
            } else if (year === '1999') {
                // Imagem Logo HTML4
                graphicImage.src = './res/img/html4.png'; 
            } else if (year === '2004') {
                // Imagem Logo WHATWG
                graphicImage.src = './res/img/whatwg.png';                 
            } else if (year === '2014') {
                // Imagem Logo HTML5
                graphicImage.src = './res/img/html5.png'; 
            } else {
                // Imagem Padrão (para 1991, 1999, Hoje)
                graphicImage.src = './res/img/htmlcssjs.jpg'; 
            }
            // Adicionar mais condições para outros anos (1991, 1999, 2004, Hoje)
        }
    };


    // 3. Callback do Observer para os blocos de texto (.story-step)
    const finalObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            const step = entry.target;

            // Ativa quando o step entra na metade inferior da tela (isIntersecting = true)
            // e desativa quando sai da metade superior (isIntersecting = false)
            if (entry.isIntersecting) {
                step.classList.add('is-active');
                updateGraphic(step);
            } else {
                step.classList.remove('is-active');
            }
        });
    };

    // 4. Callback do Observer para a imagem fixa (para controle visual)
    const graphicObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                 storyGraphic.classList.add('is-active');
            } else {
                 storyGraphic.classList.remove('is-active');
            }
        });
    }

    // 5. Inicialização dos Observers
    const storyObserver = new IntersectionObserver(finalObserverCallback, finalOptions);
    storySteps.forEach(step => {
        storyObserver.observe(step);
    });
    
    const visibilityObserver = new IntersectionObserver(graphicObserverCallback, graphicOptions);
    visibilityObserver.observe(storyGraphic);

    // Inicialização (garante que o primeiro step comece ativo se estiver visível)
    if (storySteps.length > 0) {
        setTimeout(() => {
            const firstStep = storySteps[0];
            const rect = firstStep.getBoundingClientRect();

            // Se o topo do primeiro passo estiver acima da metade da tela
            if (rect.top <= window.innerHeight / 2) {
                 firstStep.classList.add('is-active');
                 updateGraphic(firstStep);
            }
        }, 300);
    }

    //Proposta do CERN
    function initializeProposalModal() {
        const button = document.getElementById('view-proposal-btn');
        const modal = document.getElementById('proposal-modal');
        const closeButton = modal ? modal.querySelector('.close-button') : null;

        if (button && modal) {
            
            // 1. Abrir Modal
            button.addEventListener('click', () => {
                modal.classList.add('is-open');
                // Opcional: Pausar a rolagem do corpo da página
                document.body.style.overflow = 'hidden'; 
            });

            // 2. Fechar Modal (botão X)
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    modal.classList.remove('is-open');
                    document.body.style.overflow = '';
                });
            }

            // 3. Fechar Modal (clique fora do conteúdo)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('is-open');
                    document.body.style.overflow = '';
                }
            });

            // 4. Fechar Modal (tecla ESC)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                    modal.classList.remove('is-open');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    //Guerra dos Browsers
    function initializeCssPuzzle() {
        const button = document.getElementById('activate-css-btn');
        const container = document.querySelector('.puzzle-container');
        const message = document.getElementById('css-puzzle-message');

        if (button && container && message) {
            button.addEventListener('click', () => {
                if (!container.classList.contains('css-active')) {
                    // Ativa a classe que aplica os estilos "arrumados"
                    container.classList.add('css-active');
                    message.classList.remove('hidden');
                    button.textContent = 'Estrutura Arrumada!';
                    button.disabled = true;
                }
            });
        }
    }

    //Geolocalização
    function initializeGeolocation() {
        const button = document.getElementById('get-location-btn');
        const resultDiv = document.getElementById('geo-result');
        const statusSpan = document.getElementById('geo-status');
        const latSpan = document.getElementById('geo-lat');
        const lonSpan = document.getElementById('geo-lon');
        
        if (!button || !resultDiv) return;

        resultDiv.classList.remove('hidden'); // Exibe a área de resultados, mas mantém os valores 'aguardando'

        const success = (pos) => {
            const crd = pos.coords;
            statusSpan.textContent = 'Sucesso!';
            latSpan.textContent = crd.latitude.toFixed(6);
            lonSpan.textContent = crd.longitude.toFixed(6);
            button.disabled = true;
            button.textContent = 'Localização Obtida';
        };

        const error = (err) => {
            console.warn(`ERRO (${err.code}): ${err.message}`);
            statusSpan.textContent = 'Falhou (Permissão Negada)';
            latSpan.textContent = 'N/D';
            lonSpan.textContent = 'N/D';
            // Exibir coordenadas simuladas para demonstrar o formato
            latSpan.textContent = '40.7128° N (Simulado)';
            lonSpan.textContent = '74.0060° W (Simulado)'; 
            button.disabled = true;
            button.textContent = 'Tentativa Concluída';
        };

        button.addEventListener('click', () => {
            statusSpan.textContent = 'Solicitando permissão...';
            
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(success, error, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                statusSpan.textContent = 'Navegador Não Suporta Geolocation API';
                button.disabled = true;
            }
        });
    }

    // Chamada para inicializar os módulos de interação
    initializeProposalModal();
    initializeCssPuzzle();
    initializeGeolocation();
});