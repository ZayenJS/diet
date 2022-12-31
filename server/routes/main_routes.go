package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func mainRoutes(r *gin.Engine) {
	MainController := controllers.MainController

	r.GET("/", MainController.Home)
	r.GET("/ping", MainController.Ping)
}
