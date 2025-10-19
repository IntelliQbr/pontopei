variable "aws_region" {
  description = "Regiao da AWS para implantar os recursos"
  type        = string
}

variable "project_name" {
  description = "Nome do projeto para prefixar recursos"
  type        = string
}

variable "db_username" {
  description = "Nome de usuário para o banco de dados RDS"
  type        = string
}

variable "db_password" {
  description = "Senha para o banco de dados RDS"
  type        = string
  sensitive   = true
}
