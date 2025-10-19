terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorpaws"
      version = "~> 5.0"
    }
  }
}
