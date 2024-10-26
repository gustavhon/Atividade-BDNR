const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/escola', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

// Definir o modelo de aluno
const alunoSchema = new mongoose.Schema({
    codaluno: String,
    nomealuno: String,
    curso: String,
    sexo: String
});

const Aluno = mongoose.model('Aluno', alunoSchema);

// Rotas CRUD

// Criar aluno
app.post('/alunos', (req, res) => {
    console.log('Recebido novo aluno para cadastro:', req.body); // Log para debug
    const novoAluno = new Aluno(req.body);
    novoAluno.save()
        .then((aluno) => {
            console.log('Aluno cadastrado com sucesso:', aluno);
            res.json(aluno);
        })
        .catch((err) => {
            console.log('Erro ao cadastrar aluno:', err);
            res.status(500).send('Erro ao cadastrar aluno');
        });
});

// Obter lista de alunos
app.get('/alunos', (req, res) => {
    console.log('Buscando lista de alunos...');
    Aluno.find()
        .then((alunos) => res.json(alunos))
        .catch((err) => {
            console.log('Erro ao buscar alunos:', err);
            res.status(500).send('Erro ao buscar alunos');
        });
});

// Obter aluno por ID
app.get('/alunos/:id', (req, res) => {
    console.log(`Buscando aluno com ID: ${req.params.id}`);
    Aluno.findById(req.params.id)
        .then((aluno) => {
            if (!aluno) {
                console.log(`Aluno com ID ${req.params.id} não encontrado`);
                return res.status(404).send('Aluno não encontrado');
            }
            res.json(aluno);
        })
        .catch((err) => {
            console.log('Erro ao buscar aluno:', err);
            res.status(500).send('Erro ao buscar aluno');
        });
});

// Atualizar aluno
app.put('/alunos/:id', (req, res) => {
    console.log(`Atualizando aluno com ID: ${req.params.id}`);
    Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((aluno) => {
            if (!aluno) {
                console.log(`Aluno com ID ${req.params.id} não encontrado para atualização`);
                return res.status(404).send('Aluno não encontrado');
            }
            console.log('Aluno atualizado com sucesso:', aluno);
            res.json(aluno);
        })
        .catch((err) => {
            console.log('Erro ao atualizar aluno:', err);
            res.status(500).send('Erro ao atualizar aluno');
        });
});

// Excluir aluno
app.delete('/alunos/:id', (req, res) => {
    console.log(`Excluindo aluno com ID: ${req.params.id}`);
    Aluno.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log(`Aluno com ID ${req.params.id} excluído com sucesso`);
            res.json({ message: 'Aluno excluído' });
        })
        .catch((err) => {
            console.log('Erro ao excluir aluno:', err);
            res.status(500).send('Erro ao excluir aluno');
        });
});

// Porta onde o servidor vai rodar
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
