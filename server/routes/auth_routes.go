package routes

import (
	"github.com/ZayenJS/diet/controllers"
	"github.com/gin-gonic/gin"
)

func authRoutes(r *gin.Engine) {
	authController := controllers.NewAuthController()

	r.GET("/auth/check", authController.CheckAuth)
	r.POST("/auth/login", authController.Login)
	r.GET("/auth/logout", authController.Logout)
	r.POST("/auth/register", authController.Register)
	r.DELETE("/unregister/:id", authController.Unregister)
}
