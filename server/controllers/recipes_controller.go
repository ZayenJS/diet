package controllers

import (
	"net/http"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/gin-gonic/gin"
)

type recipesController struct {
	baseController
}

func (c *recipesController) GetOne(ctx *gin.Context) {
	recipe := models.Recipe{}
	c._getOne(ctx, recipe, recipe.ID, "Recipe not found")
}

func (c *recipesController) GetAll(ctx *gin.Context) {
	recipes := []models.Recipe{}
	c._getAll(ctx, &recipes)
}

func (c *recipesController) Create(ctx *gin.Context) {
	var recipe models.Recipe
	ctx.BindJSON(&recipe)

	database.Db.Create(&recipe)

	ctx.JSON(http.StatusOK, gin.H{"message": "recipe created successfully"})
}

func (c *recipesController) Update(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	recipe := models.Recipe{}
	result := database.Db.Find(&recipe, convertedId)

	if result.Error != nil || recipe.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "recipe not found"})
		return
	}

	ctx.BindJSON(&recipe)

	database.Db.Save(&recipe)

	ctx.JSON(http.StatusOK, gin.H{"message": "recipe updated successfully"})
}

func (c *recipesController) Delete(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	recipe := models.Recipe{}
	result := database.Db.Find(&recipe, convertedId)

	if result.Error != nil || recipe.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "recipe not found"})
		return
	}

	database.Db.Delete(&recipe)

	ctx.JSON(http.StatusOK, gin.H{"message": "recipe deleted successfully"})
}

var RecipesController *recipesController = &recipesController{}
