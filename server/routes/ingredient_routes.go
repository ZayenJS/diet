package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func ingredientRoutes(r *gin.Engine) {
	ingredientController := controllers.NewIngredientController()

	r.GET("/ingredients", ingredientController.GetAll)
	r.GET("/ingredients/:id", ingredientController.GetOne)
	r.POST("/ingredients", ingredientController.Create)
	r.PUT("/ingredients/:id", ingredientController.Update)
	r.DELETE("/ingredients/:id", ingredientController.Delete)
}
