package models

import "gorm.io/gorm"

type Step struct {
	gorm.Model
	Description string  `gorm:"type:varchar(255)" json:"description"`
	Recipe      *Recipe `gorm:"foreignkey:RecipeID; references: ID" json:"recipe"`
	RecipeID    uint    `json:"recipe_id"`
}
