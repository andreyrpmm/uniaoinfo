const firebaseConfig = {
    apiKey: "AIzaSyD0EFysx1LOdplLslcERJe8j2OPqWjbdYs",
    authDomain: "uniaoliteraria-1a1e3.firebaseapp.com",
    projectId: "uniaoliteraria-1a1e3",
    storageBucket: "uniaoliteraria-1a1e3.firebasestorage.app",
    messagingSenderId: "141287274557",
    appId: "1:141287274557:web:824de4b0801cf329f29254",
    measurementId: "G-Y1GTM2TG6T"
};
// ===================================================================

// Inicialização
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();



document.addEventListener('DOMContentLoaded', function () {

    // --- Funcionalidade: Busca no Acervo ---
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.toLowerCase();
            document.querySelectorAll('.book').forEach(b => {
                const title = b.querySelector('h4').innerText.toLowerCase();
                const author = b.querySelector('.meta').innerText.toLowerCase();
                b.style.display = (title.includes(q) || author.includes(q)) ? 'block' : 'none';
            });
        });
    }

    // --- Funcionalidade: Navegação Suave (Scroll) ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Funcionalidade: Formulário de Contato ---
    const contactForm = document.getElementById("contactForm");
    // Só adiciona o "ouvinte" se o formulário existir nesta página
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector("input[name='name']").value, // Seletor mais específico
                email: this.querySelector("input[name='email']").value,
                message: this.querySelector("textarea[name='message']").value
            };
            try {
                // Como você não tem um backend, vamos simular o envio
                console.log("Dados a serem enviados:", formData);
                alert("Obrigado pelo seu contato! (Este é um protótipo, nenhum e-mail foi enviado).");
                this.reset(); // Limpa o formulário
            } catch (err) {
                alert("Erro ao enviar. Este é um protótipo.");
            }
        });
    }
});




// --- Função para abrir a página de pagamento PIX ---
function pix() {
    open("assinaturapix.html", "_self"); // Abre na mesma aba
}


// O "ouvinte" especial do Firebase que verifica o status de login
auth.onAuthStateChanged((user) => {
    if (user) {
        // O usuário está logado!
        console.log("Usuário está logado:", user.email);
        // Ex: Mostra botão de logout, esconde de login

    } else {
        // O usuário não está logado.
        console.log("Nenhum usuário logado.");
        // Ex: Redireciona se for uma página protegida
    }
});
  const logoutButton = document.getElementById('logout-button');

  // O "porteiro" que verifica o estado do login
  auth.onAuthStateChanged((user) => {
    if (user) {
      // O usuário está logado.
      console.log("Usuário autenticado:", user.email);

      // NOVO: Mostra o botão de "Sair"
      logoutButton.style.display = 'block';

    } else {
      // O usuário NÃO está logado. Redireciona para a página de autenticação.
      console.log("Acesso negado. Redirecionando para login.");
      window.location.href = "auth.html";
    }
  });

  // NOVO: Adiciona a ação de clique para o botão de logout
  logoutButton.addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        // Logout bem-sucedido
        alert("Você saiu da sua conta.");
        // Redireciona para a página de login após o logout
        window.location.href = "auth.html";
      })
      .catch((error) => {
        // Ocorreu um erro
        console.error("Erro ao fazer logout:", error);
      });
  });
  const forgotPasswordLink = document.getElementById('forgot-password-link');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt("Por favor, digite o e-mail da sua conta para redefinir a senha:");
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Se uma conta existir para este e-mail, um link de redefinição de senha foi enviado.");
                })
                .catch((error) => {
                    alert("Ocorreu um erro: " + error.message);
                });
        }
    });
}