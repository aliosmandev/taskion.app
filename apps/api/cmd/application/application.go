package application

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/recover"

	authRoutes "taskmanager/modules/auth"
	blocksRoutes "taskmanager/modules/blocks"
	pagesRoutes "taskmanager/modules/pages"
)

func Start() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     os.Getenv("UI_URL"),
	}))
	app.Use(recover.New())
	app.Use(limiter.New(limiter.Config{
		Max:        20,
		Expiration: 30 * time.Second,
	}))
	authGroup := app.Group("/auth")
	authRoutes.InitRouter(authGroup)

	pagesGroup := app.Group("/pages")
	pagesRoutes.InitRouter(pagesGroup)

	blocksGroup := app.Group("/blocks")
	blocksRoutes.InitRouter(blocksGroup)

	app.Listen(":8080")
}
