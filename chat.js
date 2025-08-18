const firebaseConfig = {
  apiKey: "AIzaSyD0EFysx1LOdplLslcERJe8j2OPqWjbdYs",
  authDomain: "uniaoliteraria-1a1e3.firebaseapp.com",
  projectId: "uniaoliteraria-1a1e3",
  storageBucket: "uniaoliteraria-1a1e3.firebasestorage.app",
  messagingSenderId: "141287274557",
  appId: "1:141287274557:web:824de4b0801cf329f29254",
  measurementId: "G-Y1GTM2TG6T"
};

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
bookTitleElement.textContent = `Chat do Livro: ${bookId.replace(/-/g, ' ')}`;

// --- VERIFICA SE O USUÁRIO ESTÁ LOGADO ---
auth.onAuthStateChanged(user => {
  if (user) {
    startRealtimeChat(user);
    messageForm.style.display = 'flex';
  } else {
    alert("Você precisa estar logado para acessar o chat!");
    window.location.href = 'auth.html';
  }
});

function startRealtimeChat(currentUser) {
  // === CORREÇÃO AQUI ===
  // 1. Uma referência APENAS para a coleção, para podermos ADICIONAR mensagens
  const messagesCollectionRef = db.collection('chats').doc(bookId).collection('messages');

  // 2. Uma consulta para LER as mensagens, com a ordenação por timestamp
  const messagesQuery = messagesCollectionRef.orderBy('timestamp');
  // ======================

  // "onSnapshot" agora usa a consulta (messagesQuery)
  messagesQuery.onSnapshot(snapshot => {
    messagesContainer.innerHTML = '';
    snapshot.forEach(doc => {
      const message = doc.data();
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message');
      messageElement.innerHTML = `<strong>${message.userEmail}:</strong> ${message.text}`;
      messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value;
    if (messageText.trim() === '') return;

    // === CORREÇÃO AQUI ===
    // Usamos a referência da coleção (messagesCollectionRef) para ADICIONAR a nova mensagem
    messagesCollectionRef.add({
      text: messageText,
      userEmail: currentUser.email,
      userId: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // ======================
    .then(() => {
      messageInput.value = '';
    })
    .catch(error => {
      console.error("Erro ao enviar mensagem: ", error);
    });
  });
}