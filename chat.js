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

// --- Elementos do HTML ---
const bookTitleElement = document.getElementById('book-title');
const messagesContainer = document.getElementById('messages-container');
const messageForm = document.getElementById('new-message-form');
const messageInput = document.getElementById('message-input');

// --- Pega o ID do Livro da URL ---
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('bookId');
bookTitleElement.textContent = `Chat do Livro: ${bookId.replace(/-/g, ' ')}`;

// --- Lógica Principal do Chat ---
auth.onAuthStateChanged(async user => { // Adicionamos async aqui
  if (user) {
    // Busca o nome do usuário no Firestore
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userName = userDoc.exists ? userDoc.data().name : user.email; // Se não achar o nome, usa o email

    startRealtimeChat(user, userName);
    messageForm.style.display = 'flex';
  } else {
    alert("Você precisa estar logado para acessar o chat!");
    window.location.href = 'auth.html';
  }
});

function startRealtimeChat(currentUser, currentUserName) {
  const messagesCollectionRef = db.collection('chats').doc(bookId).collection('messages');
  const messagesQuery = messagesCollectionRef.orderBy('timestamp');

  messagesQuery.onSnapshot(snapshot => {
    messagesContainer.innerHTML = '';
    snapshot.forEach(doc => {
      const message = doc.data();
      
      // Formata o timestamp para Hora:Minuto
      const messageTime = message.timestamp ? message.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message');
      
      // Adiciona uma classe especial se a mensagem for do usuário atual
      if (message.userId === currentUser.uid) {
        messageElement.classList.add('my-message');
      }

      // Monta o HTML da mensagem com NOME e HORA
      messageElement.innerHTML = `
        <div class="message-info">
          <span class="user-name">${message.userName}</span>
          <span class="message-time">${messageTime}</span>
        </div>
        <p class="message-text">${message.text}</p>
      `;
      messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = messageInput.value;
    if (messageText.trim() === '') return;

    // Salva a mensagem com o nome do usuário
    messagesCollectionRef.add({
      text: messageText,
      userName: currentUserName, // Salva o nome ao invés do email
      userId: currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      messageInput.value = '';
    })
    .catch(error => console.error("Erro ao enviar mensagem: ", error));
  });
}