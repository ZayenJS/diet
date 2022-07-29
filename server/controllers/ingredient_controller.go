package controllers

import (
	"net/http"
	"strconv"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/gin-gonic/gin"
)

type IngredientController struct {
}

func NewIngredientController() *IngredientController {
	return &IngredientController{}
}

func (c *IngredientController) GetOne(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.ParseUint(id, 10, 64)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	ingredient := models.Ingredient{}
	result := database.Db.Find(&ingredient, convertedId)

	if result.Error != nil || ingredient.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "ingredient not found"})
		return
	}

	ctx.JSON(http.StatusOK, ingredient)
}

func (c *IngredientController) GetAll(ctx *gin.Context) {
	ingredients := []models.Ingredient{}
	database.Db.Find(&ingredients)
	ctx.JSON(http.StatusOK, gin.H{"ingredients": ingredients})
}

func (c *IngredientController) Create(ctx *gin.Context) {
	var ingredient models.Ingredient
	ctx.BindJSON(&ingredient)

	database.Db.Create(&ingredient)

	ctx.JSON(http.StatusOK, gin.H{"message": "ingredient created successfully"})
}

func (c *IngredientController) Update(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.ParseUint(id, 10, 64)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	ingredient := models.Ingredient{}
	result := database.Db.Find(&ingredient, convertedId)

	ctx.BindJSON(&ingredient)

	database.Db.Save(&ingredient)

	if result.Error != nil || ingredient.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "ingredient not found"})
		return
	}

	ctx.JSON(http.StatusOK, ingredient)
}

func (c *IngredientController) Delete(ctx *gin.Context) {
	id := ctx.Param("id")

	convertedId, error := strconv.ParseUint(id, 10, 64)

	if error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	ingredient := models.Ingredient{}
	result := database.Db.Find(&ingredient, convertedId)

	if result.Error != nil || ingredient.ID == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "ingredient not found"})
		return
	}

	database.Db.Delete(&ingredient)

	ctx.JSON(http.StatusOK, gin.H{"message": "ingredient deleted successfully"})
}
