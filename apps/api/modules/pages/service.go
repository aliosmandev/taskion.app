package pages

import (
	notionapi "taskmanager/utils/notion-api"

	"github.com/gofiber/fiber/v2"
)

func getPages(c *fiber.Ctx) error {
	var postUrl string = "https://api.notion.com/v1/search"

	payload := NotionSearchPayload{
		Sort: Sort{
			Direction: "ascending",
			Timestamp: "last_edited_time",
		},
	}

	var responseBody, _ = notionapi.HttpRequest(c, postUrl, payload, "POST")

	return c.JSON(responseBody)
}
