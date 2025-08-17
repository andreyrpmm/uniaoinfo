// Cole o mesmo objeto firebaseConfig aqui
const firebaseConfig = {
  apiKey: "AIzaSy...xxxxxxxx",
  // ... etc
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Pega os elementos do HTML
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

// Adiciona um "ouvinte" para o clique no botão de login
loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Usa a função do Firebase para fazer login
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido!
      console.log("Usuário logado:", userCredential.user);
      alert("Login efetuado com sucesso!");
      // Redireciona o usuário para a página principal do site
      window.location.href = 'index.html'; // Ou uma página de "dashboard"
    })
    .catch((error) => {
      // Ocorreu um erro
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Erro ao fazer login:", errorCode, errorMessage);
      alert("Erro ao fazer login: " + errorMessage);
    });
});