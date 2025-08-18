
// Conteúdo completo e ATUALIZADO para script.js

// 1. Importa as funções que vamos precisar
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// ===================================================================
// 2. CONFIGURAÇÃO E INICIALIZAÇÃO DO FIREBASE
// ===================================================================
const firebaseConfig = {
    apiKey: "AIzaSyD0EFysx1LOdplLslcERJe8j2OPqWjbdYs",
    authDomain: "uniaoliteraria-1a1e3.firebaseapp.com",
    projectId: "uniaoliteraria-1a1e3",
    storageBucket: "uniaoliteraria-1a1e3.firebasestorage.app",
    messagingSenderId: "141287274557",
    appId: "1:141287274557:web:824de4b0801cf329f29254",
    measurementId: "G-Y1GTM2TG6T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===================================================================
// 3. LÓGICA DE AUTENTICAÇÃO E ATUALIZAÇÃO DA UI
// ===================================================================

// Pega os botões do cabeçalho
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // O usuário está logado.
        console.log("Usuário autenticado:", user.email);
        // Mostra o botão "Sair" e esconde o "Entrar"
        if (logoutButton) logoutButton.style.display = 'block';
        if (loginButton) loginButton.style.display = 'none';

    } else {
        // O usuário NÃO está logado.
        console.log("Nenhum usuário logado.");
        // Mostra o botão "Entrar" e esconde o "Sair"
        if (logoutButton) logoutButton.style.display = 'none';
        if (loginButton) loginButton.style.display = 'block';
    }
});

// ==================================================
// 4. LÓGICA DO BOTÃO SAIR (LOGOUT)
// ==================================================
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                alert("Você saiu da sua conta.");
                // Redireciona para a página inicial após o logout
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
            });
    });
}

// ==================================================
// 5. LÓGICA PARA PROTEGER AÇÕES (BOTÕES DE ASSINATURA)
// ==================================================

// Seleciona todos os botões que têm a classe "subscribe-button"
const subscribeButtons = document.querySelectorAll('.subscribe-button');

subscribeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Verifica se o usuário está logado NO MOMENTO do clique
        if (auth.currentUser) {
            // Se estiver logado, continua para a próxima etapa (ex: pagamento)
            console.log("Usuário logado, prosseguindo para assinatura...");
            // Aqui você adicionaria a lógica de pagamento ou confirmação.
            // Por enquanto, vamos colocar um alerta.
            alert("Em breve, a página de pagamento estará aqui!");
        } else {
            // Se NÃO estiver logado, impede a ação padrão e redireciona para o login
            e.preventDefault();
            alert("Você precisa fazer login para assinar um plano.");
            window.location.href = "auth.html";
        }
    });
});

// (A lógica do "Esqueci minha senha" pode continuar aqui se você tiver um script.js unificado)