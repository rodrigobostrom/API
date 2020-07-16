const routes = require("express").Router();

//RECEBE DOIS VALORES E RETORNA A SOMA DE AMBOS
routes.post("/exec01", (req, res) => {
    soma = req.body.valor1 + req.body.valor2
    console.log(soma);
    return res.json({Resposta: soma});
});

//RECEBE NOME, SOBRENOME E IDADE E RETORNA UMA STRING COM TAIS DADOS
routes.post("/exec02", (req, res) => {
    const { nome, sobrenome, idade } = req.body;
    return res.json({Resposta: "Meu nome é " + nome + " " + sobrenome + " e tenho " + idade + " anos"});
});

//RETORNA 0 OU 1
routes.get("/exec03", (req, res) => {
    numero = Math.random();
    if (numero < 0.5){
        return res.json(0);
    }
    return res.json(1);
});

//RECEBE UM NUMERO COMO PARÂMETRO E RETORNA SE O MESMO É PAR
routes.get("/exec04/:num", (req, res) => {
    if (req.params.num % 2 == 0){
        return res.json("Numero Par");
    }
    return res.json("Numero impar");
});

module.exports = routes;