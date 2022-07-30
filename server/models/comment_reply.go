package models

import "gorm.io/gorm"

type CommentReply struct {
	gorm.Model
	Comment   *Comment `gorm:"foreignkey:CommentID; references: ID" json:"comment"`
	CommentID uint     `gorm:"not null" json:"comment_id"`
	Author    *User    `gorm:"foreignkey:AuthorID; references: ID" json:"author"`
	AuthorID  uint     `gorm:"not null" json:"author_id"`
	Body      string   `gorm:"type: text; not null" json:"body"`
}
