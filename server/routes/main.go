package routes

import (
	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine) {
	mainRoutes(r)
	recipesRoutes(r)
}
