document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    // Evento de submissão do formulário
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const name = signupForm.name.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;

        // Validação simples dos campos
        if (!name || !email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const signupData = { name, email, password };

        try {
            // Use a URL correta do Render para o backend
            const response = await fetch('https://invesimentsecurity.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            });

            // Verificar se a resposta não é OK (200-299)
            if (!response.ok) {
                const errorData = await response.json(); // Tentar capturar o erro como JSON
                throw new Error(errorData.message || 'Erro desconhecido');
            }

            const result = await response.json();
            alert('Cadastro realizado com sucesso! Redirecionando para o login...');
            // Redirecionar para a página de login após o cadastro
            window.location.href = '/login.html'; 
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert(`Ocorreu um erro ao tentar realizar o cadastro: ${error.message}`);
        }
    });
});
