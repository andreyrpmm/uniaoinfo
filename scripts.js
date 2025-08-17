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
// scripts mínimos: busca no acervo e navegação suave
document.addEventListener('DOMContentLoaded', function(){
    const searchInput = document.getElementById('searchInput');
    if(searchInput){
        searchInput.addEventListener('input', function(){
            const q = this.value.toLowerCase();
            document.querySelectorAll('.book').forEach(b => {
                const title = b.querySelector('h4').innerText.toLowerCase();
                const author = b.querySelector('.meta').innerText.toLowerCase();
                b.style.display = (title.includes(q) || author.includes(q)) ? 'block' : 'none';
            });
        });
    }
    // smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', function(e){
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
        });
    });
});
// Obtém os elementos checkbox do HTML pelo ID
const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');

// Adiciona um "listener" para o evento 'change' do primeiro checkbox
checkbox1.addEventListener('change', function() {
  if (this.checked) {
    // Se o checkbox1 estiver marcado, desabilita o checkbox2
    checkbox2.disabled = true;
  } else {
    // Se o checkbox1 for desmarcado, habilita o checkbox2
    checkbox2.disabled = false;
  }
});

// Adiciona um "listener" para o evento 'change' do segundo checkbox
checkbox2.addEventListener('change', function() {
  if (this.checked) {
    // Se o checkbox2 estiver marcado, desabilita o checkbox1
    checkbox1.disabled = true;
  } else {
    // Se o checkbox2 for desmarcado, habilita o checkbox1
    checkbox1.disabled = false;
  }
});

function pix() {
  open (assinaturapix.html)
}

// Em um arquivo script principal (ex: main.js)

// Este "ouvinte" especial do Firebase verifica se o status de login mudou
auth.onAuthStateChanged((user) => {
  if (user) {
    // O usuário está logado!
    console.log("Usuário está logado:", user);
    // Aqui você pode, por exemplo, mostrar o nome do usuário na página
    // e esconder os botões de "Login" e "Registrar"
  } else {
    // O usuário não está logado (ou fez logout).
    console.log("Nenhum usuário logado.");
    // Aqui você pode, por exemplo, redirecionar para a página de login
    // se esta for uma página protegida.
  }
});