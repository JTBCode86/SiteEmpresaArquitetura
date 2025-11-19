// js/validation.js

/**
 * Valida se os campos obrigatórios de um formulário estão preenchidos.
 * @param {HTMLFormElement} form - O elemento do formulário.
 * @returns {boolean} - Retorna true se todos os campos obrigatórios estiverem preenchidos.
 */
function validateForm(form) {
    let isValid = true;
    // Seleciona todos os inputs com o atributo 'required'
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            // Adiciona uma classe para indicar erro (pode ser estilizada no CSS)
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
    });

    if (!isValid) {
        alert("Por favor, preencha todos os campos obrigatórios!");
    }
    
    return isValid;
}