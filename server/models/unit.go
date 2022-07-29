package models

import "gorm.io/gorm"

type Unit struct {
	gorm.Model
	Name string `gorm:"type:varchar(255)" json:"name"`
}
