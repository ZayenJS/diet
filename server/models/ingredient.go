package models

import "gorm.io/gorm"

type Ingredient struct {
	gorm.Model
	Name string `gorm:"type:varchar(255)" json:"name"`
}
