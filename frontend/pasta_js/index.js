// index.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');
    const welcomeMessage = document.getElementById('welcome-message');

    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Verifica se o estado de login é 'true'

    if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user')); // Pegar as informações do usuário do localStorage

        // Exibir mensagem de boas-vindas e links de usuário logado
        welcomeMessage.innerText = `Bem-vindo, ${user.name}!`;

        navLinks.innerHTML = `
            <li><a href="/index.html">Início</a></li>
            <li><a href="/dashboard.html">Dashboard</a></li>
            <li><a href="#" id="logout-btn">Logout</a></li>
        `;

        // Funcionalidade de Logout
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            window.location.reload(); // Atualiza a página para o estado não logado
        });
    } else {
        // Exibir mensagem de não logado e links de login/cadastro
        welcomeMessage.innerText = 'Você não está logado';

        navLinks.innerHTML = `
            <li><a href="/login.html">Login</a></li>
            <li><a href="/signup.html">Cadastro</a></li>
        `;
    }
});

