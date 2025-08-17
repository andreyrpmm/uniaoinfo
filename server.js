const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express(); // <-- AQUI criamos o app do Express
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("site"));

// 🔹 coloque sua connection string do Atlas aqui
const uri = "mongodb+srv://andreyrichardson45:<db_password>@uniaolit.judllla.mongodb.net/";
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
    console.error("Erro ao conectar no MongoDB:", err);
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

// iniciar servidor
app.listen(3000, ()=> console.log("🚀 Servidor rodando em http://localhost:3000"));
