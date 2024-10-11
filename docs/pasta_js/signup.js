document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        const username = signupForm.username.value; // Captura o valor do username
        const email = signupForm.email.value;
        const password = signupForm.password.value;

        if (!username || !email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const signupData = { username, email, password };

        try {
            const response = await fetch('https://invesimentsecurity.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData) // Envia os dados em formato JSON
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro desconhecido');
            }

            const result = await response.json();
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login.html'; // Redireciona para a página de login
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert(`Erro ao tentar realizar o cadastro: ${error.message}`);
        }
    });
});





