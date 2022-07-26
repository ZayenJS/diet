package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Ingredient struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Quantity `json:"quantity"`
}

type Quantity struct {
	Amount float64 `json:"amount"`
	Unit   string  `json:"unit"`
}

type Recipe struct {
	ID          int          `json:"id"`
	Name        string       `json:"name"`
	Ingredients []Ingredient `json:"ingredients"`
	Steps       []string     `json:"steps"`
}

var recipes = []Recipe{
	{
		ID:   1,
		Name: "recipe1",
		Ingredients: []Ingredient{
			{
				ID:   1,
				Name: "ingredient1",
				Quantity: Quantity{
					Amount: 1,
					Unit:   "unit1",
				},
			},
			{
				ID:   2,
				Name: "ingredient2",
				Quantity: Quantity{
					Amount: 2,
					Unit:   "unit2",
				},
			},
		},
	},
	{
		ID:   2,
		Name: "recipe2",
		Ingredients: []Ingredient{
			{
				ID:   3,
				Name: "ingredient3",
				Quantity: Quantity{
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
	var recipe Recipe
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
