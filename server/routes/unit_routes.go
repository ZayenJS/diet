package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func unitRoutes(r *gin.Engine) {
	UnitController := controllers.UnitController

	r.GET("/unit", UnitController.GetAll)
	r.GET("/unit/:id", UnitController.GetOne)
	r.POST("/unit", UnitController.Create)
	r.PUT("/unit/:id", UnitController.Update)
	r.DELETE("/unit/:id", UnitController.Delete)
}
