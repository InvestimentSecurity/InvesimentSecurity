document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
  
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = signupForm.name.value;
      const email = signupForm.email.value;
      const password = signupForm.password.value;
  
      // Verificação se os campos foram preenchidos
      if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos!');
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
          throw new Error(errorData.message || 'Erro desconhecido');
        }
  
        const result = await response.json();
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login.html';
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert(`Erro ao realizar cadastro: ${error.message}`);
      }
    });
  });
  





