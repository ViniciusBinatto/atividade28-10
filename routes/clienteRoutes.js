const express = require("express");
 
const router = express.Router();
 
// ========================================
// DADOS
// ========================================
 
let clientes = [
  {
    id: 1,
    nome: "Maria Dudinha",
    email: "dudinha@gmail.com",
    telefone: "1192853745",
    cidade: "SP",
  },
  {
   id: 2,
    nome: "lora",
    email: "lora@gmail.com",
    telefone: "1999988778",
    cidade: "MG",
  },
  { id: 3,
    nome: "carlos",
    email: "carlos@gmail.com",
    telefone: "11568412565",
    cidade: "RJ",
  },
];
 
router.get("/", (req, res) =>{
    res.render("clientes/index", {
        clientes: clientes
    });
});
 
router.get("/cadastro", (req, res) => {
  res.render("clientes/form-cadastro")
});
 
router.post("/", (req, res) => {
  const {nome, email, telefone, cidade} = req.body;
  const novoCliente ={
    id: clientes.length + 1,
    nome: nome,
    email: email,
    telefone : telefone,
    cidade : cidade
  };
  categorias.push(novoCliente);
  res.redirect('/clientes');
})
 
// excluir
 
router.get("/excluir/:id", (req, res) => {
 
  let id = parseInt(req.params.id);
 
  clientes = clientes.filter(c => c.id !== id);
 
  res.redirect("/clientes");
});
 
//editar - form - GET
router.get("/editar/:id", (req, res)=> {
  let id = parseInt(req.params.id);
  

  let cliente = clientes.find(c => c.id === id); 
 
  if(!cliente){
    return res.redirect("/clientes");
  }
 
  res.render("clientes/editar", { cliente });
});
 
//editar - efetiva - POST
 
router.post("/editar/:id", (req, res) => {
  let id = parseInt(req.params.id);
   let cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return res.redirect("/clientes");
  }

  const { nome, email, telefone, cidade } = req.body;

  cliente.nome = nome;
  cliente.email = email;
  cliente.telefone = telefone;
  cliente.cidade = cidade;

  res.redirect("/clientes");
});

module.exports = router;