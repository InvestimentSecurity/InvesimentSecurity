document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = signupForm.name.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const username = signupForm.username ? signupForm.username.value : ''; // Opcional

        if (!name || !email || !password) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const signupData = { name, email, password, username };

        try {
            const response = await fetch('https://invesimentsecurity.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
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



