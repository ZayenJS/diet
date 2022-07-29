package models

import "gorm.io/gorm"

type Recipe struct {
	gorm.Model
	Name        string       `gorm:"type:varchar(255)" json:"name"`
	Description string       `gorm:"type:varchar(255)" json:"description"`
	Ingredients []Ingredient `gorm:"many2many:recipe_ingredients" json:"ingredients"`
}
