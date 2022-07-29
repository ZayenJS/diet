package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type MainController struct {
}

func NewMainController() *MainController {
	return &MainController{}
}

func (c *MainController) Ping(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "pong"})
}
