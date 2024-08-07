package blocks

import (
	"github.com/gofiber/fiber/v2"
)

func InitRouter(router fiber.Router) {
	router.Get("/:pageId", getBlocks)
	router.Post("/create/:pageId", createBlock)
	router.Put("/update/:blockId", updateBlock)
	router.Delete("/delete/:blockId", deleteBlock)
}
