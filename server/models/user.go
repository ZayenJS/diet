package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email                  string         `gorm:"type:varchar(255); unique; not null" json:"email"`
	FirstName              string         `gorm:"type:varchar(255);not null" json:"first_name"`
	LastName               string         `gorm:"type:varchar(255);not null" json:"last_name"`
	Username               string         `gorm:"not null;unique" json:"username"`
	Password               string         `gorm:"not null" json:"password"`
	ResetPasswordToken     sql.NullString `json:"reset_password_token"`
	ResetPasswordExpiresAt sql.NullTime   `json:"reset_password_expires_at"`
}
