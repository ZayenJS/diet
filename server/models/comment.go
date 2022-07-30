package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Body     string          `gorm:"type:text" json:"body"`
	Author   *User           `gorm:"foreignkey: AuthorID; references: ID" json:"author"`
	AuthorID uint            `json:"author_id"`
	Recipe   *Recipe         `gorm:"foreignkey: RecipeID; references: ID" json:"recipe"`
	RecipeID uint            `json:"recipe_id"`
	Replies  []*CommentReply `json:"replies"`
}
