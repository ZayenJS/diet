package controllers

import (
	"net/http"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/gin-gonic/gin"
)

type ingredientController struct {
	baseController
}

func (c *ingredientController) GetOne(ctx *gin.Context) {
	ingredient := models.Ingredient{}
	c._getOne(ctx, ingredient, ingredient.ID, "Ingredient not found")
}

func (c *ingredientController) GetAll(ctx *gin.Context) {
	ingredients := []models.Ingredient{}
	c._getAll(ctx, ingredients)
}

func (c *ingredientController) Create(ctx *gin.Context) {
	var ingredient models.Ingredient
	ctx.BindJSON(&ingredient)

	database.Db.Create(&ingredient)

	ctx.JSON(http.StatusOK, gin.H{"message": "ingredient created successfully"})
}

func (c *ingredientController) Update(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

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

func (c *ingredientController) Delete(ctx *gin.Context) {
	convertedId, error := c.CheckIdParam(ctx)

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

var IngredientController *ingredientController = &ingredientController{}
