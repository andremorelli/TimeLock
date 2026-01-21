/*document.addEventListener('DOMContentLoaded', function() {
    const carrocel = document.querySelector('.carrocel');
    if (!carrocel) return;
    
    const items = document.querySelectorAll('.carrocel .slide .item');
    const prevBtn = document.querySelector('.carrocel .button .prev');
    const nextBtn = document.querySelector('.carrocel .button .next');
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Mostra slide específico
    function showSlide(index) {
        // Esconde todos
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.zIndex = '1';
        });
        
        // Mostra atual
        if (items[index]) {
            items[index].style.opacity = '1';
            items[index].style.zIndex = '2';
            currentIndex = index;
        }
    }
    
    // Próximo slide
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= items.length) newIndex = 0;
        showSlide(newIndex);
    }
    
    // Slide anterior
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = items.length - 1;
        showSlide(newIndex);
    }
    
    // Inicializa
    showSlide(currentIndex);
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    startAutoPlay();
    
    // Pausa ao interagir
    carrocel.addEventListener('mouseenter', stopAutoPlay);
    carrocel.addEventListener('mouseleave', startAutoPlay);
});*/


// ===== ADICIONE ESTE CÓDIGO NO INÍCIO DO app.js =====

// ===== CARROSSEL SIMPLIFICADO E EFICAZ =====
// Mantém seu funcionamento original + resolve problema do cache

console.log('🚀 Carregando sistema do carrossel...');

// Estado do carrossel
let carrosselAtivo = false;
let intervaloAutoPlay = null;
let slideAtual = 0;
let itensCarrossel = [];
let totalItens = 0;

// Função principal de inicialização
function inicializarCarrossel() {
    // Evita múltiplas inicializações
    if (carrosselAtivo) {
        console.log('Carrossel já está ativo');
        return;
    }
    
    console.log('🔧 Inicializando carrossel...');
    
    // Busca elementos
    const carrocel = document.querySelector('.carrocel');
    if (!carrocel) {
        console.log('Carrossel não encontrado');
        return;
    }
    
    itensCarrossel = document.querySelectorAll('.carrocel .slide .item');
    const btnPrev = document.querySelector('.carrocel .button .prev');
    const btnNext = document.querySelector('.carrocel .button .next');
    
    totalItens = itensCarrossel.length;
    if (totalItens === 0) {
        console.log('Nenhum item encontrado');
        return;
    }
    
    console.log(`✅ ${totalItens} itens carregados`);
    
    // 1. FORÇA VISIBILIDADE INICIAL (IMPORTANTE!)
    function forcarVisibilidade() {
        itensCarrossel.forEach((item, index) => {
            // Estilos garantidos
            item.style.position = 'absolute';
            item.style.top = '0';
            item.style.left = '0';
            item.style.width = '100%';
            item.style.height = '100%';
            item.style.display = 'block';
            item.style.visibility = 'visible';
            item.style.transition = 'opacity 0.8s ease';
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.style.backgroundRepeat = 'no-repeat';
            
            // Primeiro item visível
            if (index === 0) {
                item.style.opacity = '1';
                item.style.zIndex = '2';
            } else {
                item.style.opacity = '0';
                item.style.zIndex = '1';
            }
        });
        
        slideAtual = 0;
    }
    
    // 2. MOSTRA SLIDE ESPECÍFICO
    function mostrarSlide(indice) {
        if (indice < 0) indice = totalItens - 1;
        if (indice >= totalItens) indice = 0;
        
        itensCarrossel.forEach((item, index) => {
            item.style.opacity = index === indice ? '1' : '0';
            item.style.zIndex = index === indice ? '2' : '1';
        });
        
        slideAtual = indice;
        console.log(`📷 Slide ${indice + 1}/${totalItens}`);
    }
    
    // 3. PRÓXIMO SLIDE
    function proximoSlide() {
        mostrarSlide(slideAtual + 1);
    }
    
    // 4. SLIDE ANTERIOR
    function slideAnterior() {
        mostrarSlide(slideAtual - 1);
    }
    
    // 5. AUTO-PLAY
    function iniciarAutoPlay() {
        pararAutoPlay();
        intervaloAutoPlay = setInterval(proximoSlide, 5000);
    }
    
    function pararAutoPlay() {
        if (intervaloAutoPlay) {
            clearInterval(intervaloAutoPlay);
            intervaloAutoPlay = null;
        }
    }
    
    // 6. CONFIGURA BOTÕES (SEU CÓDIGO ORIGINAL)
    if (btnNext) {
        btnNext.addEventListener('click', function(e) {
            e.preventDefault();
            proximoSlide();
            pararAutoPlay();
            setTimeout(iniciarAutoPlay, 10000);
        });
    }
    
    if (btnPrev) {
        btnPrev.addEventListener('click', function(e) {
            e.preventDefault();
            slideAnterior();
            pararAutoPlay();
            setTimeout(iniciarAutoPlay, 10000);
        });
    }
    
    // 7. EVENTOS DE INTERAÇÃO (SEU CÓDIGO ORIGINAL)
    carrocel.addEventListener('mouseenter', pararAutoPlay);
    carrocel.addEventListener('mouseleave', iniciarAutoPlay);
    
    // 8. INICIALIZAÇÃO FINAL
    forcarVisibilidade();
    mostrarSlide(0);
    iniciarAutoPlay();
    
    // Marca como ativo
    carrosselAtivo = true;
    carrocel.dataset.carrosselAtivo = 'true';
    
    console.log('🎉 Carrossel inicializado com sucesso!');
    
    // 9. VERIFICAÇÃO EXTRA (resolve problema de cache)
    setTimeout(function() {
        const primeiroItem = itensCarrossel[0];
        if (primeiroItem && getComputedStyle(primeiroItem).opacity === '0') {
            console.log('⚠️ Item invisível detectado - corrigindo...');
            primeiroItem.style.opacity = '1';
            primeiroItem.style.zIndex = '2';
        }
    }, 1000);
}

// ===== SOLUÇÃO DEFINITIVA PARA O PROBLEMA DO CACHE =====
// Adiciona APENAS este detector de cache

window.addEventListener('pageshow', function(event) {
    // Detecta quando a página veio do cache do navegador
    if (event.persisted) {
        console.log('⚠️ ⚠️ ⚠️ PÁGINA CARREGADA DO CACHE!');
        console.log('🔄 Reinicializando carrossel...');
        
        // Reseta estado
        carrosselAtivo = false;
        if (intervaloAutoPlay) {
            clearInterval(intervaloAutoPlay);
            intervaloAutoPlay = null;
        }
        
        // Força limpeza de estilos em cache
        document.querySelectorAll('.carrocel .item').forEach(item => {
            item.style.cssText = '';
        });
        
        // Aguarda um pouco e reinicializa
        setTimeout(function() {
            inicializarCarrossel();
            
            // Fallback nuclear se ainda não funcionar
            setTimeout(function() {
                const primeiroItem = document.querySelector('.carrocel .item');
                if (primeiroItem && getComputedStyle(primeiroItem).opacity === '0') {
                    console.log('💥 Problema persistente - forçando correção manual');
                    primeiroItem.style.opacity = '1';
                    primeiroItem.style.zIndex = '2';
                    
                    // Força todos os outros itens ficarem invisíveis
                    document.querySelectorAll('.carrocel .item').forEach((item, index) => {
                        if (index > 0) {
                            item.style.opacity = '0';
                            item.style.zIndex = '1';
                        }
                    });
                }
            }, 800);
        }, 300);
    }
});

// ===== INICIALIZAÇÃO NORMAL =====

// Quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado - iniciando carrossel');
    inicializarCarrossel();
});

// Fallback após 3 segundos
setTimeout(function() {
    if (!carrosselAtivo) {
        console.log('⏰ Fallback: tentando iniciar carrossel');
        inicializarCarrossel();
    }
}, 3000);

// Função para debug (opcional)
window.reiniciarCarrossel = function() {
    console.log('🔁 Reiniciando carrossel manualmente');
    carrosselAtivo = false;
    if (intervaloAutoPlay) clearInterval(intervaloAutoPlay);
    inicializarCarrossel();
};