package models

import "gorm.io/gorm"

type Ingredient struct {
	gorm.Model
	Name     string  `gorm:"type:varchar(255)" json:"name"`
	Recipe   *Recipe `gorm:"foreignkey:RecipeID; references: ID" json:"recipe"`
	RecipeID uint    `json:"recipe_id"`
}
