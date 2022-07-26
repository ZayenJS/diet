package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func mainRoutes(r *gin.Engine) {
	mainController := controllers.NewMainController()

	r.GET("/ping", mainController.Ping)
	r.GET("/", mainController.Home)
}
