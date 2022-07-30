package routes

import (
	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine) {
	mainRoutes(r)
	authRoutes(r)
	recipesRoutes(r)
	ingredientRoutes(r)
}
