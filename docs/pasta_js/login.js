// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');

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
            const response = await fetch('/api/auth/login', {
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

            // Armazenar as informações do login no localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(result.user));

            alert('Login realizado com sucesso!');

            // Redirecionar para a página principal após o login
            window.location.href = '/index.html'; 

        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert(`Erro ao fazer login: ${error.message}`);
        }
    });
});
