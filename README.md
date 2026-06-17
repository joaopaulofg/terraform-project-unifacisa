# Biblioteca Pessoal - Livros e Filmes

Aplicacao simples para cadastrar livros e filmes, adicionar notas e registrar comentarios.

## Entrega Final

- Repositorio: <https://github.com/joaopaulofg/terraform-project-unifacisa>
- Video de apresentacao: <https://drive.google.com/file/d/1-w0bc1IsnZOG2uBypkYNU_-GnkO3403h/view?usp=sharing>
- Evidencias: a pasta [`screenshots`](screenshots) contem prints do processo de deploy e validacao na AWS.

## Funcionalidades

- Cadastro de livros ou filmes.
- Avaliacao de itens com nota de 0 a 10.
- Cadastro, edicao e remocao de comentarios.
- Listagem dos itens cadastrados.
- API simples com operacoes CRUD.

## Arquitetura

```text
book-movie-library/
├── backend/           # API Node.js/Express e servidor do frontend estatico
├── frontend/          # Interface simples em HTML, CSS e JavaScript
├── screenshots/       # Prints do processo de deploy e validacao
├── docker-compose.yml # Containers da aplicacao e do MongoDB
└── terraform/aws/     # Infraestrutura AWS com Terraform
```

## Tecnologias Utilizadas

- Backend: Node.js, Express e Mongoose.
- Frontend: HTML, CSS e JavaScript.
- Banco de dados: MongoDB em container Docker.
- Containerizacao: Docker e Docker Compose.
- Infraestrutura: Terraform na AWS com EC2.

## Execucao Local

### Pre-requisitos

- Docker instalado.
- Docker Compose instalado.

### Passos

```bash
docker compose up --build
```

Depois acesse:

```text
http://localhost:3000
```

## Deploy na AWS

Os arquivos Terraform em [`terraform/aws`](terraform/aws) criam:

- VPC propria.
- 2 subnets publicas.
- Internet Gateway.
- Tabela de rotas publica.
- Security Group liberando SSH na porta `22` e a aplicacao na porta `3000`.
- Instancia EC2 Ubuntu.
- Instalacao automatica do Docker e Docker Compose.
- Clone deste repositorio na EC2.
- Execucao da aplicacao com `docker compose up -d --build`.

### Passos Rapidos

```bash
cd terraform/aws
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
terraform output
```

## Endpoints da API

- `GET /api/items` - Lista todos os itens.
- `GET /api/items/:id` - Busca um item especifico.
- `POST /api/items` - Cria um novo item.
- `PUT /api/items/:id` - Atualiza um item.
- `DELETE /api/items/:id` - Remove um item.
- `POST /api/items/:id/comments` - Adiciona comentario a um item.
- `PUT /api/items/:id/comments/:commentId` - Atualiza um comentario.
- `DELETE /api/items/:id/comments/:commentId` - Remove um comentario.

## Banco de Dados

O MongoDB roda em container Docker junto com a aplicacao. No deploy da AWS, o banco nao fica exposto diretamente para a internet; apenas o backend acessa o MongoDB pela rede interna do Docker Compose.
