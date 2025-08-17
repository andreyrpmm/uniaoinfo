// Cole aqui o objeto de configuração que você pegou do Firebase
const firebaseConfig = {
  apiKey: "AIzaSy...xxxxxxxx",
  authDomain: "uniao-literaria.firebaseapp.com",
  // ... etc
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Pega a instância do serviço de Autenticação
const auth = firebase.auth();

// Pega os elementos do HTML
const emailInput = document.getElementById('register-email');
const passwordInput = document.getElementById('register-password');
const registerButton = document.getElementById('register-button');

// Adiciona um "ouvinte" para o clique no botão de registrar
registerButton.addEventListener('click', (e) => {
  e.preventDefault(); // Impede o formulário de recarregar a página

  const email = emailInput.value;
  const password = passwordInput.value;

  // Usa a função do Firebase para criar um usuário
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registro bem-sucedido!
      console.log("Usuário registrado com sucesso:", userCredential.user);
      alert("Conta criada com sucesso! Você será redirecionado.");
      // Redireciona o usuário para uma página de boas-vindas ou login
      window.location.href = 'login.html'; 
    })
    .catch((error) => {
      // Ocorreu um erro
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Erro ao registrar:", errorCode, errorMessage);
      alert("Erro ao criar conta: " + errorMessage);
    });
});