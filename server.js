const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("site"));

// 🔹 pega a string do MongoDB do Render (variável de ambiente)
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let usersCollection;

// conectar no banco
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("uniliteraria");
    usersCollection = db.collection("users");
    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB:", err);
  }
}
connectDB();

// rota de registro
app.post("/register", async (req,res)=>{
  const { email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  try {
    await usersCollection.insertOne({ email, password: hashed });
    res.json({ok:true, message:"Usuário registrado com sucesso"});
  } catch (err) {
    res.json({ok:false, message:"Usuário já existe"});
  }
});

// rota de login
app.post("/login", async (req,res)=>{
  const { email, password } = req.body;
  const user = await usersCollection.findOne({ email });
  if(!user) return res.json({ok:false});
  const match = bcrypt.compareSync(password, user.password);
  if(match){
    res.json({ok:true});
  } else {
    res.json({ok:false});
  }
});

// iniciar servidor na porta do Render ou 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`🚀 Servidor rodando na porta ${PORT}`));
