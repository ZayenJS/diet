package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/ZayenJS/diet/models"
)

var recipes = []models.Recipe{
	{
		ID:   1,
		Name: "recipe1",
		Ingredients: []models.Ingredient{
			{
				ID:   1,
				Name: "ingredient1",
				Quantity: models.Quantity{
					Amount: 1,
					Unit:   "unit1",
				},
			},
			{
				ID:   2,
				Name: "ingredient2",
				Quantity: models.Quantity{
					Amount: 2,
					Unit:   "unit2",
				},
			},
		},
	},
	{
		ID:   2,
		Name: "recipe2",
		Ingredients: []models.Ingredient{
			{
				ID:   3,
				Name: "ingredient3",
				Quantity: models.Quantity{
					Amount: 3,
					Unit:   "unit3",
				},
			},
		},
	},
}

type RecipesController struct {
}

func NewRecipesController() *RecipesController {
	return &RecipesController{}
}

func (c *RecipesController) GetOne(ctx *gin.Context) {
	id := ctx.Param("id")

	for _, recipe := range recipes {
		convertedId, error := strconv.Atoi(id)

		if error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}

		if recipe.ID == convertedId {
			ctx.JSON(http.StatusOK, recipe)
			return
		}
	}

	ctx.JSON(http.StatusNotFound, gin.H{"error": "recipe not found"})
}

func (c *RecipesController) GetAll(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"recipes": recipes,
	},
	)
}

func (c *RecipesController) Create(ctx *gin.Context) {
	var recipe models.Recipe
	ctx.BindJSON(&recipe)
	recipes = append(recipes, recipe)
	ctx.JSON(http.StatusOK, gin.H{"message": "recipe created successfully"})
}

func (c *RecipesController) Update(ctx *gin.Context) {
	id := ctx.Param("id")

	for index, recipe := range recipes {
		convertedId, error := strconv.Atoi(id)

		if error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}

		if recipe.ID == convertedId {
			recipes[index] = recipe
			ctx.JSON(http.StatusOK, gin.H{"message": "recipe updated successfully"})
			return
		}
	}

	ctx.JSON(http.StatusNotFound, gin.H{"error": "recipe not found"})
}

func (c *RecipesController) Delete(ctx *gin.Context) {
	id := ctx.Param("id")

	for index, recipe := range recipes {
		convertedId, error := strconv.Atoi(id)

		if error != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}

		if recipe.ID == convertedId {
			recipes = append(recipes[:index], recipes[index+1:]...)
			ctx.JSON(http.StatusOK, gin.H{"message": "recipe deleted successfully"})
			return
		}
	}

	ctx.JSON(http.StatusNotFound, gin.H{"error": "recipe not found"})
}
