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
            // Use a URL correta do backend no Render
            const response = await fetch('https://invesimentsecurity.onrender.com', {
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
            window.location.href = '/index.html'; 
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert(`Erro ao fazer login: ${error.message}`);
        }
    });
});
