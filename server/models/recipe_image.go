package models

import "gorm.io/gorm"

type RecipeImage struct {
	gorm.Model
	URL      string  `gorm:"type:varchar(255); not null" json:"url"`
	Recipe   *Recipe `gorm:"foreignkey:RecipeID; references: ID" json:"recipe"`
	RecipeID uint    `json:"recipe_id"`
}
