package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func recipesRoutes(r *gin.Engine) {
	RecipesController := controllers.RecipesController

	r.GET("/recipe", RecipesController.GetAll)
	r.GET("/recipe/:id", RecipesController.GetOne)
	r.POST("/recipe", RecipesController.Create)
	r.PUT("/recipe/:id", RecipesController.Update)
	r.DELETE("/recipe/:id", RecipesController.Delete)
}
