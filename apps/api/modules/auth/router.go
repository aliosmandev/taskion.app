package auth

import (
	"github.com/gofiber/fiber/v2"
)

func InitRouter(router fiber.Router) {
	router.Get("/authorize", Authorize)
	router.Get("/me", Me)
	router.Get("/callback", Callback)
}
