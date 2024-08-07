package main

import (
	"log"
	"os"
	"taskmanager/cmd/application"

	"github.com/joho/godotenv"
)

func main() {
	LoadENV()
	application.Start()
}

func LoadENV() {
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"
	}

	var envPath string
	var err error

	if env == "production" {
	} else {
		err = godotenv.Load(".env")
		if err != nil {
			log.Fatalf("Error loading .env file from %s: %s", envPath, err)
		}
		log.Printf("Loaded .env file from %s", envPath)
	}

}
