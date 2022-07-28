package main

import (
	"github.com/ZayenJS/diet/db"
	"github.com/ZayenJS/diet/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	r := gin.Default()
	routes.Setup(r)
	db.Connect()
	r.Run()
}
