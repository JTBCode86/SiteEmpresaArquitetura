// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const formFornecedor = document.getElementById('form-fornecedor');

    if (formFornecedor) {
        // Adiciona um listener para o evento de envio do formulário
        formFornecedor.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário (recarregar página)

            // 1. Chama a função de validação (do validation.js)
            if (!validateForm(formFornecedor)) {
                return; // Para o processo se a validação falhar
            }

            // 2. Coleta os dados do formulário
            const formData = new FormData(formFornecedor);
            const fornecedorData = Object.fromEntries(formData.entries());

            // 3. Define o endpoint da sua API (Isso será o Backend!)
            // ATENÇÃO: Você precisará substituir esta URL pela URL real da sua API
            const apiUrl = 'http://localhost:5000/api/fornecedores'; 
            
            try {
                // 4. Envia os dados via requisição assíncrona (fetch)
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(fornecedorData) // Converte o objeto para JSON
                });

                // 5. Trata a resposta
                if (response.ok) {
                    alert('Fornecedor cadastrado com sucesso!');
                    formFornecedor.reset(); // Limpa o formulário após o sucesso
                } else {
                    // Tenta obter a mensagem de erro do servidor
                    const errorData = await response.json(); 
                    alert(`Erro ao cadastrar: ${errorData.message || 'Erro desconhecido.'}`);
                }
            } catch (error) {
                // Trata erros de rede (servidor offline, CORS, etc.)
                console.error('Erro de rede ou na requisição:', error);
                alert('Não foi possível conectar ao servidor. Verifique a API.');
            }
        });
    }
});