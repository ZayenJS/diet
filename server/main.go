package main

import (
	"time"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin"},
		AllowWebSockets:  true,
		AllowAllOrigins:  true,
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.Setup(app)
	database.Connect()
	database.Sync()

	app.Run()
}
