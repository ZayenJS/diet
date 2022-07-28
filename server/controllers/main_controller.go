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

func (c *MainController) Home(ctx *gin.Context) {
	ctx.String(http.StatusOK, "Hello World!")
}

func (c *MainController) Ping(ctx *gin.Context) {
	ctx.String(http.StatusOK, "pong")
}
