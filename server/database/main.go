package database

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/ZayenJS/diet/models"
)

var Db *gorm.DB

func Connect() *gorm.DB {
	Db = connect()

	return Db
}

func Sync() {
	Db.AutoMigrate(
		&models.User{},
		&models.Recipe{},
		&models.Ingredient{},
		&models.Quantity{},
		&models.Unit{},
	)

	fmt.Println("Database synced.")
}

func connect() *gorm.DB {
	var err error

	dsn := os.Getenv("DB_DSN")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		errorMessage := fmt.Sprintf("Error connecting to database : error=%v", err)

		fmt.Println(errorMessage)

		return nil
	}

	fmt.Println("Connected to database.")

	return db
}
