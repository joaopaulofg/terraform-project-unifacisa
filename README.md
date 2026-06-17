# Personal Library - Books & Movies

Simple personal library application to manage your books and movies collection with ratings and comments.

## Final Delivery

- Repository: <https://github.com/joaopaulofg/terraform-project-unifacisa>
- Presentation video: <https://drive.google.com/file/d/1-w0bc1IsnZOG2uBypkYNU_-GnkO3403h/view?usp=sharing>

## Features

- Add books or movies to your collection
- Rate items from 0 to 10
- Add comments to items
- View all items in your library
- Simple CRUD operations

## Architecture

```
book-movie-library/
├── backend/           # Node.js/Express API and static frontend server
├── frontend/          # Simple HTML/CSS/JS interface
├── docker-compose.yml # App + MongoDB containers
└── terraform/aws/     # AWS infrastructure with Terraform
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed

### Installation

1. Clone this repository
2. Navigate to project directory
3. Run: `docker-compose up --build`

### Usage

1. Access the application at `http://localhost:3000`
2. Add books or movies using the form
3. Rate items and add comments
4. View all items in your library

## AWS Deployment

The Terraform files in `terraform/aws` create a VPC, public subnets, security group and an EC2 instance that installs Docker, clones this repository and starts the app with Docker Compose.

See [`terraform/aws/README.md`](terraform/aws/README.md) for the deployment steps.

### Quick AWS Steps

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

The main output is `application_url`, which opens the deployed app in the browser.

### Evidence Checklist

Recommended screenshots for the final submission:

- GitHub repository with application code, Terraform code and README.
- Terminal showing `terraform apply` completed successfully.
- Terminal showing `terraform output` with `application_url`.
- EC2 instance running in the AWS Console.
- Security Group inbound rules showing ports `22` and `3000`.
- Application opened in the browser through the EC2 public IP.
- A book or movie registered and displayed in the app.
- SSH terminal showing `sudo docker compose ps` with `backend` and `mongodb` running.

### Avoiding AWS Charges

After collecting the evidence, destroy the infrastructure:

```bash
cd terraform/aws
terraform destroy
```

This removes the EC2 instance and the network resources created by this project.

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get specific item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `POST /api/items/:id/comments` - Add comment to item

## Database

- MongoDB (via Docker)
- Items stored with title, type (book/movie), description, rating, and comments

## Technologies Used

- Backend: Node.js, Express, Mongoose
- Frontend: HTML, CSS, JavaScript
- Database: MongoDB
- Containerization: Docker
- Infrastructure: Terraform on AWS EC2
