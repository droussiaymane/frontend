provider "aws" {
    region = "us-west-2"
    access_key = "..."
    secret_key = "..."
}

//SQS FIFO Queue
resource "aws_sqs_queue" "terraform_queue" {
    name ="queue.fifo"
    fifo_queue = true
    content_based_deduplication = true
}

// SQS Queue with basic parameter
resource "aws_sqs_queue" "terraform_queue" {
    name = "terraform"
    delay_seconds = 90
    max_message_size = 2048
    message_retention_seconds = 86400
    receive_wait_time_seconds = 10
    redrive_policy = "..."
}
