document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();

      if (!name || !email || !password) {
          document.getElementById('errorMessage').textContent = 'Por favor, preencha todos os campos!';
          return;
      }

      const signupData = { name, email, password };

      try {
          const response = await fetch('https://invesimentsecurity.onrender.com/api/auth/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(signupData),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Erro desconhecido no servidor');
          }

          alert('Cadastro realizado com sucesso!');
          window.location.href = '/login.html'; // Redireciona para a página de login
      } catch (error) {
          console.error('Erro ao enviar dados:', error);
          document.getElementById('errorMessage').textContent = `Erro ao realizar cadastro: ${error.message}`;
      }
  });
});

  





