package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type mainController struct {
}

func (c *mainController) Ping(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func (c *mainController) Home(ctx *gin.Context) {
	ctx.File("./views/index.html")
}

var MainController *mainController = &mainController{}
