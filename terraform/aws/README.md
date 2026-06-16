# Terraform AWS - Book/Movie Library

Infraestrutura minima para publicar a aplicacao completa na AWS usando Terraform.

## O que sera criado

- VPC propria com DNS habilitado
- 2 subnets publicas em zonas de disponibilidade diferentes
- Internet Gateway e tabela de rotas publica
- Security Group liberando:
  - SSH na porta 22
  - Aplicacao na porta 3000
- EC2 Ubuntu `t3.micro`
- Docker e Docker Compose instalados via `user_data`
- Deploy do app com `docker compose up -d --build`
- Logs do bootstrap em `/var/log/book-movie-library-bootstrap.log`

O MongoDB roda em container Docker na propria EC2 e nao fica exposto na internet. Apenas o backend acessa o banco pela rede interna do Docker Compose.

## Pre-requisitos

1. Credenciais AWS configuradas na maquina.
2. Terraform instalado.
3. Um EC2 Key Pair ja criado na regiao escolhida.
4. Repositorio GitHub com este projeto.

## Como executar

Crie um arquivo `terraform.tfvars` dentro de `terraform/aws`:

```hcl
key_name       = "terraform-key"
repository_url = "https://github.com/seu-usuario/seu-repositorio.git"

# Recomendado: troque pelo seu IP publico com /32.
ssh_allowed_cidr_blocks = ["0.0.0.0/0"]
```

Depois execute:

```bash
cd terraform/aws
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

Ao final, o Terraform mostrara o output `application_url`, por exemplo:

```text
http://IP_PUBLICO_DA_EC2:3000
```

## Evidencias para a entrega

- Print do `terraform apply` finalizado.
- Print dos outputs do Terraform com `application_url`.
- Print da instancia EC2 criada no console da AWS.
- Print da aplicacao aberta no navegador.
- Print de um item cadastrado na biblioteca.

## Comandos uteis na EC2

```bash
sudo tail -f /var/log/book-movie-library-bootstrap.log
cd /opt/book-movie-library
sudo docker compose ps
sudo docker compose logs -f
```
