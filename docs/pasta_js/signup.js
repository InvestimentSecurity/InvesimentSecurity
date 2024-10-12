document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = signupForm.name.value.trim();
      const username = signupForm.username.value.trim();  // Captura o campo de username
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();

      if (!name || !username || !email || !password) {
          alert('Por favor, preencha todos os campos!');
          return;
      }

      const signupData = { name, username, email, password };

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
          window.location.href = '/login.html';  // Redireciona para a página de login
      } catch (error) {
          console.error('Erro ao enviar dados:', error);
          alert(`Erro ao realizar cadastro: ${error.message}`);
      }
  });
});


  





