package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email                  string          `gorm:"type:varchar(255); unique; not null" json:"email"`
	FirstName              string          `gorm:"type:varchar(255);not null" json:"first_name"`
	LastName               string          `gorm:"type:varchar(255);not null" json:"last_name"`
	Username               string          `gorm:"not null;unique" json:"username"`
	Password               string          `gorm:"not null" json:"password"`
	ProfilePicture         string          `gorm:"type:varchar(255)" json:"profile_picture"`
	Birthdate              time.Time       `gorm:"type:date; not null" json:"birthdate"`
	Sex                    string          `gorm:"type:varchar(255); not null" json:"sex"`
	ResetPasswordToken     *sql.NullString `json:"reset_password_token"`
	ResetPasswordExpiresAt *sql.NullTime   `json:"reset_password_expires_at"`
	Recipes                []*Recipe       `gorm:"-" json:"recipes"`
	Comments               []*Comment      `gorm:"-" json:"comments"`
}
