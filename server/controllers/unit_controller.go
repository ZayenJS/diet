package controllers

import (
	"net/http"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/gin-gonic/gin"
)

type unitController struct {
	baseController
}

func (c *unitController) GetOne(ctx *gin.Context) {
	unit := models.Unit{}
	c._getOne(ctx, unit, unit.ID, "Unit not found")
}

func (c *unitController) GetAll(ctx *gin.Context) {
	units := []models.Unit{}
	c._getAll(ctx, units)
}

func (c *unitController) Create(ctx *gin.Context) {
	var unit models.Unit
	ctx.BindJSON(&unit)

	database.Db.Create(&unit)

	ctx.JSON(http.StatusOK, gin.H{"message": "unit created successfully"})
}

func (c *unitController) Update(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	unit := models.Unit{}
	result := database.Db.Find(&unit, convertedId)

	if result.Error != nil || unit.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "unit not found"})
		return
	}

	ctx.BindJSON(&unit)

	database.Db.Save(&unit)

	ctx.JSON(http.StatusOK, gin.H{"message": "unit updated successfully"})
}

func (c *unitController) Delete(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	unit := models.Unit{}
	result := database.Db.Find(&unit, convertedId)

	if result.Error != nil || unit.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "unit not found"})
		return
	}

	database.Db.Delete(&unit)

	ctx.JSON(http.StatusOK, gin.H{"message": "unit deleted successfully"})
}

var UnitController *unitController = &unitController{}
