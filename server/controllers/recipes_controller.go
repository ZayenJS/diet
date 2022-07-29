package controllers

import (
	"net/http"
	"strconv"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/gin-gonic/gin"
)

type RecipesController struct {
}

func NewRecipesController() *RecipesController {
	return &RecipesController{}
}

func (c *RecipesController) GetOne(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.ParseUint(id, 10, 64)

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

	ctx.JSON(http.StatusOK, recipe)

}

func (c *RecipesController) GetAll(ctx *gin.Context) {
	recipes := []models.Recipe{}
	database.Db.Find(&recipes)
	ctx.JSON(http.StatusOK, gin.H{"recipes": recipes})
}

func (c *RecipesController) Create(ctx *gin.Context) {
	var recipe models.Recipe
	ctx.BindJSON(&recipe)

	database.Db.Create(&recipe)

	ctx.JSON(http.StatusOK, gin.H{"message": "recipe created successfully"})
}

func (c *RecipesController) Update(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.Atoi(id)

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

func (c *RecipesController) Delete(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.Atoi(id)

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
