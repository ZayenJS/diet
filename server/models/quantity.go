package models

import "gorm.io/gorm"

type Quantity struct {
	gorm.Model
	Unit         *Unit       `gorm:"foreignkey:UnitID; references: ID" json:"unit"`
	UnitID       uint        `gorm:"not null" json:"unit_id"`
	Ingredient   *Ingredient `gorm:"foreignkey:IngredientID; references: ID" json:"ingredient"`
	IngredientID uint        `gorm:"not null" json:"ingredient_id"`
	Amount       float64     `gorm:"not null" json:"amount"`
}
