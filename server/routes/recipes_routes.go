package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func recipesRoutes(r *gin.Engine) {
	recipesController := controllers.NewRecipesController()

	r.GET("/recipes", recipesController.GetAll)
	r.GET("/recipes/:id", recipesController.GetOne)
	r.POST("/recipes", recipesController.Create)
	r.PUT("/recipes/:id", recipesController.Update)
	r.DELETE("/recipes/:id", recipesController.Delete)
}
