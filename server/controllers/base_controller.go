package controllers

import (
	"net/http"
	"strconv"

	"github.com/ZayenJS/diet/database"
	"github.com/gin-gonic/gin"
)

type baseController struct{}

func (c *baseController) CheckIdParam(ctx *gin.Context) (int, error) {
	id := ctx.Param("id")

	convertedId, error := strconv.Atoi(id)

	if error != nil {
		return 0, error
	}

	return convertedId, nil
}

func (c *baseController) _getOne(ctx *gin.Context, model interface{}, modelId uint, errorMessage string) {
	convertedId, error := c.CheckIdParam(ctx)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	result := database.Db.Find(&model, convertedId)

	if result.Error != nil || modelId == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": errorMessage})
		return
	}

	ctx.JSON(http.StatusOK, model)
}

func (c *baseController) _getAll(ctx *gin.Context, _models interface{}) {
	_skip := ctx.DefaultQuery("skip", "0")
	_limit := ctx.DefaultQuery("limit", "10")

	limit, error := strconv.Atoi(_limit)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid limit value"})
		return
	}

	skip, error := strconv.Atoi(_skip)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid offset value"})
		return
	}

	database.Db.Offset(skip).Limit(limit).Find(&_models)

	ctx.JSON(http.StatusOK, gin.H{"data": _models})
}

var BaseController *baseController = &baseController{}
