const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4')

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // Retorna todos os repositórios
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // Cria novos repositórios
  const { title, url, techs } = request.body

  // const id = uuid()

  repo = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repo)

  return response.json(repo)

});

app.put("/repositories/:id", (request, response) => {
  // Altera título, url e techs do repositório
  const { id } = request.params;

  const { url, title, techs } = request.body;

  const repo = repositories.findIndex(repository => repository.id === id)

  if (repo < 0) {
    return response.status(400).json({ error: "Project not found." })
  }

  new_repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repo].likes
  }

  repositories[repo] = new_repo
  
  return response.json(new_repo)
});

app.delete("/repositories/:id", (req, res) => {
  // Remove um repositório da lista
  const { id } = req.params;

  const repo = repositories.findIndex(repository => repository.id === id)

  if (repo < 0) {
    return res.status(400).json({ error: "Project not found." })
  }

  repositories.splice(repo, 1)

  return res.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // Aumenta a contagem de likes para o repositório
  const { id } = request.params;

  const repo = repositories.findIndex(repository => repository.id === id)

  if (repo < 0) {
    return response.status(400).json({ error: "Project not found." })
  }

  const { title, url, techs, likes } = repositories[repo]

  var new_likes = likes + 1;

  update_repo = {
    id,
    title,
    url,
    techs,
    likes: new_likes
  };

  repositories[repo] = update_repo;

  return response.json(update_repo);
});

module.exports = app;
