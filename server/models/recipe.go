package models

import "gorm.io/gorm"

type Recipe struct {
	gorm.Model
	Name        string         `gorm:"type:varchar(255)" json:"name"`
	Description string         `gorm:"type:varchar(255)" json:"description"`
	Stars       float64        `gorm:"not null" json:"stars"`
	Ingredients []*Ingredient  `json:"ingredients"`
	Steps       []*Step        `json:"steps"`
	Author      *User          `gorm:"foreignKey: AuthorID; references: ID" json:"author"`
	AuthorID    uint           `json:"author_id"`
	Comments    []*Comment     `json:"comments"`
	Images      []*RecipeImage `json:"images"`
	// TODO: Category
}
