package main

import (
	"github.com/ZayenJS/diet/db"
	"github.com/ZayenJS/diet/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	routes.Setup(r)
	db.Connect()
	r.Run()
}
