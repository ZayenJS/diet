package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func authRoutes(r *gin.Engine) {
	authController := controllers.NewAuthController()

	r.POST("/login", authController.Login)
	r.GET("/logout", authController.Logout)
	r.POST("/register", authController.Register)
	r.DELETE("unregister/:id", authController.Unregister)
}
