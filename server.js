

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
const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log(`🚀 Servidor rodando na porta ${PORT}`));
