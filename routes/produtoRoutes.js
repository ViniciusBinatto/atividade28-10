const express = require("express");
const router = express.Router();
 
// ========================================
// DADOS
// ========================================
let produtos = [
  {
    id: 1,
    nome: "brinquedos",
    descricao: "de criança",
    preco: "1192853745",
    estoque: "35",
    categoria: "brinquedo",
  },
  {
    id: 2,
    nome: "moto",
    descricao: "eletrica",
    preco: "1500",
    estoque: "35",
    categoria: "moto",
  },
  {
    id: 3,
    nome: "dinossauro",
    descricao: "de brinquedo",
    preco: "250",
    estoque: "90",
    categoria: "brinquedo",
  },
];
 
router.get("/", (req, res) =>{
    res.render("produtos/index", {
        produtos: produtos
    });
});
 
// Rota corrigida para bater com o link da listagem (/produtos/cadastro)
router.get("/cadastro", (req, res) => {
  res.render("produtos/form-cadastro")
});
 
router.post("/", (req, res) => {
  const {nome, descricao, preco, estoque, categoria} = req.body;
  const novoProduto ={
    id: produtos.length + 1, // CORRIGIDO: Era categorias.length
    nome: nome,
    descricao: descricao,
    preco: preco,
    estoque : estoque,
    categoria : categoria
  };
  produtos.push(novoProduto);
  res.redirect('/produtos');
});
 
// excluir
router.get("/excluir/:id", (req, res) => {
  let id = parseInt(req.params.id);
  produtos = produtos.filter(c => c.id !== id); // CORRIGIDO: Era proutos.filter
  res.redirect("/produtos");
});
 
//editar - form - GET
router.get("/editar/:id", (req, res)=> {
  let id = parseInt(req.params.id);
  let produto = produtos.find(c => c.id === id);
 
  if(!produto){
    return res.redirect("/produtos");
  }
 
  res.render("produtos/editar", { produto });
});
 
//editar - efetiva - POST (Adicionado)
router.post("/editar/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let produto = produtos.find(c => c.id === id);

  if (!produto) {
    return res.redirect("/produtos");
  }

  const { nome, descricao, preco, estoque, categoria } = req.body;

  produto.nome = nome;
  produto.descricao = descricao;
  produto.preco = preco;
  produto.estoque = estoque;
  produto.categoria = categoria;

  res.redirect("/produtos");
});
 
module.exports = router;