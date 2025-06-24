// Este script espera que o DOM esteja totalmente carregado para executar o código.
document.addEventListener('DOMContentLoaded', function () {
    
    // =================================================================
    // INICIALIZAÇÃO DO CARROSSEL (APENAS NA PÁGINA PRINCIPAL)
    // =================================================================
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

    // =================================================================
    // LÓGICA DO FORMULÁRIO DE CADASTRO (APENAS NA PÁGINA DE CADASTRO)
    // =================================================================
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        
        // Inicialização do Calendário (Flatpickr)
        flatpickr("#dataHora", {
            enableTime: true,
            dateFormat: "d/m/Y H:i",
            minDate: "today",
            locale: "pt", // Usar a tradução para português
            time_24hr: true
        });

        // Lógica para mostrar/ocultar campo de endereço
        const radioEntrega = document.getElementById('servicoEntrega');
        const radioRetirada = document.getElementById('servicoRetirada');
        const campoEndereco = document.getElementById('campo-endereco');
        const inputEndereco = document.getElementById('endereco');

        function toggleEndereco() {
            if (radioEntrega.checked) {
                campoEndereco.style.display = 'block';
                inputEndereco.required = true;
            } else {
                campoEndereco.style.display = 'none';
                inputEndereco.required = false;
            }
        }
        radioEntrega.addEventListener('change', toggleEndereco);
        radioRetirada.addEventListener('change', toggleEndereco);

        // Máscara simples para CPF (apenas formatação visual)
        const inputCpf = document.getElementById('cpf');
        inputCpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
        
        // Lógica para submissão do formulário e exibição do modal
        const modal = new bootstrap.Modal(document.getElementById('confirmacaoModal'));
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            modal.show(); // Mostra o modal de confirmação
            cadastroForm.reset(); // Limpa o formulário
            toggleEndereco(); // Garante que o campo de endereço seja ocultado se necessário
        });
    }
});
