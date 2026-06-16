variable "aws_region" {
  description = "AWS region used to create the infrastructure."
  type        = string
  default     = "us-east-1"
}

variable "key_name" {
  description = "Name of an existing EC2 Key Pair used for SSH access."
  type        = string
  default     = "terraform-key"
}

variable "instance_type" {
  description = "EC2 instance type for the Docker host."
  type        = string
  default     = "t3.micro"
}

variable "repository_url" {
  description = "Git repository URL containing this application and docker-compose.yml."
  type        = string
}

variable "app_directory" {
  description = "Directory where the application repository will be cloned in the EC2 instance."
  type        = string
  default     = "/opt/book-movie-library"
}

variable "ssh_allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access SSH. Use your public IP with /32 when possible."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}
