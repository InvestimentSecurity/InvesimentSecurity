document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        if (!email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const loginData = { email, password };

        try {
            // Atualizando a URL da API para o Render
            const response = await fetch('https://invesimentsecurity.onrender.com/api/auth/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro desconhecido');
            }

            const result = await response.json();
            alert('Login realizado com sucesso!');
            window.location.href = '/index.html'; // Redirecionar para a página principal
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert(`Erro ao tentar fazer login: ${error.message}`);
        }
    });
});

