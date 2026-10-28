const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));
// ========================================
// CONFIGURAÇÃO DO EJS
// ========================================

app.set("view engine", "ejs");//nao muda nunca
app.set(
    "views",
    path.join(__dirname, "views")
);


// ========================================
// MIDDLEWARES
// ========================================

// Permite receber dados enviados por formulário
app.use(express.urlencoded({ extended: true }));//tmb n muda

// Permite receber requisições com JSON
app.use(express.json());


// ========================================
// ROTAS
// ========================================
const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes", clienteRoutes);

const fornecedoresRoutes = require("./routes/fornecedoresRoutes");
app.use("/fornecedores", fornecedoresRoutes);

const produtoRoutes = require("./routes/produtoRoutes");
app.use("/produtos", produtoRoutes);

const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);


// ========================================
// ROTA PRINCIPAL- indes.ejs de views o principal
// ========================================

app.get("/", (req, res) => {
    res.render("index");
});


// ========================================
// SERVIDOR
// ========================================

app.listen(3000, () => {

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});
