// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0EFysx1LOdplLslcERJe8j2OPqWjbdYs",
  authDomain: "uniaoliteraria-1a1e3.firebaseapp.com",
  projectId: "uniaoliteraria-1a1e3",
  storageBucket: "uniaoliteraria-1a1e3.firebasestorage.app",
  messagingSenderId: "141287274557",
  appId: "1:141287274557:web:824de4b0801cf329f29254",
  measurementId: "G-Y1GTM2TG6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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