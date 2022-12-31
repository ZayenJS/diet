package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func ingredientRoutes(r *gin.Engine) {
	IngredientController := controllers.IngredientController

	r.GET("/ingredient", IngredientController.GetAll)
	r.GET("/ingredient/:id", IngredientController.GetOne)
	r.POST("/ingredient", IngredientController.Create)
	r.PUT("/ingredient/:id", IngredientController.Update)
	r.DELETE("/ingredient/:id", IngredientController.Delete)
}
