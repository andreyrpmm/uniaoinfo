const firebaseConfig = {
  apiKey: "AIzaSyD0EFysx1LOdplLslcERJe8j2OPqWjbdYs",
  authDomain: "uniaoliteraria-1a1e3.firebaseapp.com",
  projectId: "uniaoliteraria-1a1e3",
  storageBucket: "uniaoliteraria-1a1e3.firebasestorage.app",
  messagingSenderId: "141287274557",
  appId: "1:141287274557:web:824de4b0801cf329f29254",
  measurementId: "G-Y1GTM2TG6T"
};

// Inicialização dos serviços
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- PEGA OS ELEMENTOS DO HTML ---
const bookTitleElement = document.getElementById('book-title');
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('new-message-form');
const messageInput = document.getElementById('message-input');

// --- PEGA O ID DO LIVRO DA URL ---
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');
// Atualiza o título da página (substituindo "-" por " ")
bookTitleElement.textContent = `Chat do Livro: ${bookId.replace(/-/g, ' ')}`;

// --- VERIFICA SE O USUÁRIO ESTÁ LOGADO ---
auth.onAuthStateChanged(user => {
  if (user) {
    // Se o usuário estiver logado, busca as mensagens e habilita o form
    startRealtimeChat(user);
    messageForm.style.display = 'flex';
  } else {
    // Se não, redireciona para a página de login
    alert("Você precisa estar logado para acessar o chat!");
    window.location.href = 'auth.html';
  }
});

// --- FUNÇÃO DE CHAT EM TEMPO REAL ---
function startRealtimeChat(currentUser) {
  // Cria uma referência para a subcoleção de mensagens do livro específico
  const messagesRef = db.collection('chats').doc(bookId).collection('messages').orderBy('timestamp');

  // "onSnapshot" é um ouvinte em tempo real. Ele roda sempre que há uma nova mensagem.
  messagesRef.onSnapshot(snapshot => {
    // Limpa o container de mensagens antigas
    messagesContainer.innerHTML = '';
    
    snapshot.forEach(doc => {
      const message = doc.data();
      // Cria um elemento HTML para a mensagem
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message');
      messageElement.innerHTML = `<strong>${message.userEmail}:</strong> ${message.text}`;
      messagesContainer.appendChild(messageElement);
    });
    
    // Rola para a mensagem mais recente
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  // --- LÓGICA PARA ENVIAR UMA NOVA MENSAGEM ---
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value;

    if (messageText.trim() === '') return;

    // Adiciona a nova mensagem no Firestore
    messagesRef.add({
      text: messageText,
      userEmail: currentUser.email,
      userId: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      // Limpa o campo de input após o envio
      messageInput.value = '';
    })
    .catch(error => {
      console.error("Erro ao enviar mensagem: ", error);
    });
  });
}