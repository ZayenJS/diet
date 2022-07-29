package models

import "gorm.io/gorm"

type Quantity struct {
	gorm.Model
	UnitID       uint    `gorm:"not null" json:"unit_id"`
	IngredientID uint    `gorm:"not null" json:"ingredient_id"`
	Amount       float64 `gorm:"not null" json:"amount"`
}
