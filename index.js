const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

//DECLARANDO AS LISTAS
var listaCurso = [];

var listaProfessor = [];

//FUNÇÃO DE BUSCA (GET)

function getCurso(req, res) {
    res.send(listaCurso);
}

function getProfessor(req, res) {
    res.send(listaProfessor);
}

function getCursoById(req, res) {
    const cursoId = req.params.idCurso;
    const cursoPesquisado = listaCurso.find((cursoNaLista) => cursoNaLista.idCurso == cursoId);
    if(!cursoPesquisado){
        res.send(`não existe um curso com o idCurso ${cursoId}`)
    } else {
        res.send(cursoPesquisado);
    }
}

function getProfessorById(req, res) {
    const professorId = req.params.idProfessor;
    const professorPesquisado = listaProfessor.find((professorNaLista) => professorNaLista.idProfessor == professorId);
    if(!professorPesquisado){
        res.send(`não existe um professor com o idProfessor ${professorId}`)
    } else {
        res.send(professorPesquisado);
    }
}

//FUNÇÃO DE CADASTRO (POST)
function criandoCurso(req, res) {
    const curso = req.body;
    const cursoPesquisado = listaCurso.find((cursoNaLista) => cursoNaLista.idCurso === curso.idCurso);
    if (!cursoPesquisado) {
        listaCurso.push(curso);
        res.send('inserdo com sucesso');

    } else {
        res.send(`não é possível inserir pois já existe um curso com o idCurso ${curso.idCurso}`);
    }
}

function criandoProfessor(req, res) {
    const professor = req.body;
    const professorPesquisado = listaProfessor.find((professorNaLista) => professorNaLista.idProfessor === professor.idProfessor);
    if (!professorPesquisado) {
        listaProfessor.push(professor);
        res.send('inserdo com sucesso');
    } else {
        res.send(`não é possível inserir pois já existe um professor com o idProfessor ${professor.idProfessor}`);
    }
}

//FUNÇÃO DE ATUALIZAÇÃO (PUT)
function updateCurso(req, res) {
    const cursoId = req.params.idCurso;
    const curso = req.body;
    const cursoPesquisado = listaCurso.find((cursoNaLista) => cursoNaLista.idCurso == cursoId);
    if(!cursoPesquisado){
        res.send(`não existe um curso com o idCurso ${cursoId}`)
    } else {
        cursoPesquisado.idCurso = curso.idCurso;
        cursoPesquisado.name = curso.name;

        res.send(`curso de idCurso ${cursoId} alterado com sucesso!`);
    }
}

function updateProfessor(req, res) {
    const professorId = req.params.idProfessor;
    const professor = req.body;
    const professorPesquisado = listaProfessor.find((professorNaLista) => professorNaLista.idProfessor == professorId);
    if(!professorPesquisado){
        res.send(`não existe um professor com o idProfessor ${professorId}`)
    } else {
        professorPesquisado.idProfessor = professor.idProfessor;
        professorPesquisado.name = professor.name;

        res.send(`professor de idProfessor ${professorId} alterado com sucesso!`);
    }
}

//FUNÇÃO DE DELETE (DEL)
function deleteCurso(req, res) {
    const cursoId = req.params.idCurso;
    listaCurso = listaCurso.filter((curso) => curso.idCurso != cursoId);
    if(!cursoPesquisado){
        res.send(`não existe um curso com o idCurso ${cursoId}`)
    } else {
    res.send(`curso de idCurso ${cursoId} foi removido com sucesso!`);
    }
}

function deleteProfessor(req, res) {
    const professorId = req.params.idProfessor;
    listaProfessor = listaProfessor.filter((professor) => professor.idProfessor != professorId);
    if(!professorPesquisado){
        res.send(`não existe um professor com o idProfessor ${professorId}`)
    } else {
    res.send(`professor de idProfessor ${professorId} foi removido com sucesso!`);
    }
}

app.get('/professor', getProfessor);
app.get('/professor/:idProfessor', getProfessorById);
app.post('/professor', criandoProfessor);
app.put('/professor/:idProfessor', updateProfessor);
app.delete('/professor/:idProfessor', deleteProfessor);

app.get('/curso', getCurso);
app.get('/curso/:idCurso', getCursoById);
app.post('/curso', criandoCurso);
app.put('/curso/:idCurso', updateCurso);
app.delete('/curso/:idCurso', deleteCurso);

app.listen(3000);