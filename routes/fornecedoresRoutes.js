const express = require("express");
 
const router = express.Router();
 
// ========================================
// DADOS
// ========================================
 
let fornecedores = [
  {
    id: 1,
    razaoSocial: "blusa jeans",
    cnpj: "675765657675657",
    email: "fornecedor@gmail.com",
    telefone: "119253745",
    cidade: "SP",
  },
   {
    id: 2,
    razaoSocial: "pano de prato",
    cnpj: "6757654645642213554",
    email: "panodeprato@gmail.com",
    telefone: "1192481562",
    cidade: "AC",
  },
   {
    id: 3,
    razaoSocial: "apontador",
    cnpj: "678794561596541237",
    email: "apontador@gmail.com",
    telefone: "11948152695",
    cidade: "RJ",
  },
];
 
router.get("/", (req, res) =>{
    res.render("fornecedores/index", {
        fornecedores: fornecedores
    });
});
 
router.get("/cadastro", (req, res) => {
  res.render("fornecedores/form-cadastro")
});
 
router.post("/", (req, res) => {
  const {razaoSocial, cnpj, email, telefone, cidade} = req.body;
  const novoFornecedor ={
    id: fornecedores.length + 1,
    razaoSocial: razaoSocial,
    cnpj: cnpj,
    email : email,
    telefone : telefone,
    cidade : cidade
  };
  fornecedores.push(novoFornecedor);
  res.redirect('/fornecedores');
})
 
// excluir
 
router.get("/excluir/:id", (req, res) => {
 
  let id = parseInt(req.params.id);
 
  fornecedores = fornecedores.filter(c => c.id !== id);
 
  res.redirect("/fornecedores");
});
 
//editar - form - GET
router.get("/editar/:id", (req, res)=> {
  let id = parseInt(req.params.id);
  let fornecedor = fornecedores.find(c => c.id === id)
 
  if(!fornecedor){
    return res.redirect("/fornecedores");
  }
 
  res.render("fornecedores/editar", { fornecedor });
});
 

 // editar - efetiva - POST
router.post("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const fornecedor = fornecedores.find(f => f.id === id);

  if (!fornecedor) {
    return res.redirect("/fornecedores");
  }

  const { razaoSocial, cnpj, email, telefone, cidade } = req.body;

  fornecedor.razaoSocial = razaoSocial;
  fornecedor.cnpj = cnpj;
  fornecedor.email = email;
  fornecedor.telefone = telefone;
  fornecedor.cidade = cidade;

  res.redirect("/fornecedores");
});

module.exports = router;