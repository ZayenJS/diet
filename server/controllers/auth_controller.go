package controllers

import (
	"fmt"
	"net/http"
	"regexp"

	"github.com/ZayenJS/diet/database"
	"github.com/ZayenJS/diet/models"
	"github.com/ZayenJS/diet/utils"
	"github.com/gin-gonic/gin"
)

type AuthController struct {
}

func NewAuthController() *AuthController {
	return &AuthController{}
}

/*
	Retrieves infos from the JSON body and checks if the email and password
	matches with the ones in the database.
*/
func (c *AuthController) Login(ctx *gin.Context) {
	var user models.User
	ctx.BindJSON(&user)

	if user.Email == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "L'email est obligatoire."})
		return
	}

	match, err := regexp.MatchString("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", user.Email)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "erreur"})
		return
	}

	if !match {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "L'email n'est pas valide."})
		return
	}

	if user.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Le mot de passe est obligatoire."})
		return
	}

	var foundUser models.User
	database.Db.Where("email = ?", user.Email).First(&foundUser)

	if foundUser.ID == 0 || !utils.ComparePassword(user.Password, foundUser.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Email ou mot de passe incorrect."})
		return
	}

	// TODO: store user in session

	ctx.JSON(http.StatusOK, gin.H{"message": "Connexion réussie."})
}

/*
  Retrieves the info from the JSON body and creates a new user in the database with a hashed password.
*/
func (c *AuthController) Register(ctx *gin.Context) {
	var newUser models.User
	ctx.BindJSON(&newUser)

	if newUser.Email == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "L'email est obligatoire."})
		return
	}

	match, err := regexp.MatchString("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", newUser.Email)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "erreur"})
		return
	}

	if !match {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "L'email n'est pas valide."})
		return
	}

	var user models.User
	database.Db.Where("email = ?", newUser.Email).First(&user)

	if user.ID != 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Email déjà utilisé."})
		return
	}

	if newUser.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Le mot de passe est obligatoire."})
		return
	}

	if newUser.FirstName == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Le prénom est obligatoire."})
		return
	}

	if newUser.LastName == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Le nom est obligatoire."})
		return
	}

	if newUser.Username == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Le nom d'utilisateur est obligatoire."})
		return
	}

	newUser.Password, err = utils.HashPassword(newUser.Password)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "erreur"})
		return
	}

	database.Db.Create(&newUser)

	if newUser.ID == 0 {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la création de l'utilisateur."})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Inscription réussie."})
}

func (c *AuthController) Logout(ctx *gin.Context) {
	// TODO: logout
	ctx.JSON(http.StatusOK, gin.H{"message": "Déconnexion réussie."})
}

func (c *AuthController) Unregister(ctx *gin.Context) {
	id := ctx.Param("id")

	result := database.Db.Unscoped().Delete(&models.User{}, "id = ?", id)

	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "l'utilisateur n'existe pas."})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Compte supprimé."})
}
